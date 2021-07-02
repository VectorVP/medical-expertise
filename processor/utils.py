""" Process visual data (images, pdf, html), detecs ICD-10 codes and helps analyze completeness of medical help.
Default option is to process html file.

Usage:
    python3 utils.py

Author:
    Vladislav Tumko - 20.06.21
"""

import re
import time
import json
import cv2
import numpy as np
import pandas as pd

import icd10
import PyPDF2
import pytesseract

from pytesseract import Output
from fuzzywuzzy import fuzz
from fuzzywuzzy import process
from selectolax.parser import HTMLParser


def preprocessor(image_str):
    """ Convert image-string (bytes) to original image.

    Args:
        image_str (string): image in bytes.

    Returns:
        object: original image.
    """

    image = np.fromstring(image_str, dtype=np.uint8)
    image = cv2.imdecode(image, 0)
    return image


def icd_regex(text):
    """ Find ICD-10 codes in the text.

    Args:
        text (string): text to process.

    Returns:
        list: list of all ICD-10 codes in text.
    """

    pattern = r'[A-Z]\d+\.?\d+?'
    icd_codes = re.findall(pattern, text)
    return icd_codes


def parse_image(image_path):
    """ Find ICD-10 codes in the image.

    Args:
        image_path (string): image path to process.

    Returns:
        list: list of all ICD-10 codes in image.
    """

    img = cv2.imread(image_path)
    img_data = pytesseract.image_to_string(img, output_type=Output.DICT)
    icd_codes = icd_regex(img_data['text'])
    icd_codes = list(filter(lambda x: x != 'B10', icd_codes))
    return icd_codes_image


def parse_pdf(pdf_path):
    """ Find ICD-10 codes in pdf.

    Args:
        pdf_path (string): pdf path to process.

    Returns:
        list: list of all ICD-10 codes in pdf.
    """

    with open(pdf_path, 'rb') as pdf_file:
        pdf_reader = PyPDF2.PdfFileReader(pdf_file)
        pdf_pages = pdf_reader.numPages
        text = []
        for i in pdf_page:
            pdf_page = pdf_reader.getPage(i)
            text.append(pdf_page.extractText())
    icd_codes_pdf = icd_regex(text)
    return icd_codes_pdf


def parse_html(html_path):
    """ Parse html file and get list of sentences.

    Args:
        htlm_path (string): html path to parse.

    Returns:
        list of strings: list of sentences.
    """

    full_text = []
    with open(html_path,  'r') as html_file:
        html = html_file.readlines()
        for i in html:
            tree = HTMLParser(i)
            if tree.body is None:
                return None
            for tag in tree.css('script'):
                tag.decompose()
            for tag in tree.css('style'):
                tag.decompose()
            text = tree.body.text(separator='')
            text = ' '.join(text.split())
            full_text.append(text)
    full_text = list(filter(lambda x: x != '', full_text))
    return full_text


def find_icd_block(icd_codes):
    """Find hierarchy block for each icd code.
    With icd10 library it is also possible (e.g. code = J20.0):
    - check if code exists - code.billable: True or False
    - get description - code.description: e.g. Acute bronchitis due to Mycoplasma pneumoniae
    - get chapter - code.chapter: e.g. X
    - get block - code.block: e.g. J00-J99
    - get block desctiprion - code.block_desription: e.g. Diseases of the respiratory system

    Args:
        icd_codes (list of strings): list of icd codes to process.

    Returns:
        dict: {'icd code': 'icd block'}.
    """

    icd_dict = {}
    for i in icd_codes:
        code = icd10.find(i)
        if code.billable:
            icd_dict[i] = code.block
    return icd_dict


def icd_treatment(icd_list):
    """ Returns treatment plan for every icd10 code.

    Args:
        icd_list (list of strings): list of icd10 codes.

    Returns:
        dict: {'ICD-10 code': ['treatment', 'plan']}.
    """

    procedures = json.load(open("data/203.json", 'r'))
    procedures_dict = {}
    for i in icd_list:
        try:
            values = [value for key, value in procedures.items() if i in key]
            procedures_dict[i] = values[0]
        except:
            continue
    return procedures_dict


def phrase_detect(list_base, phrase):
    """ Find similarity between source and parsed texts.

    Args:
        list_base (list of strings): list of source text phrases.
        phrase (string): parsed string.

    Returns:
        list of tuples: list of pairs word-confidence.
    """

    list_match = process.extract(phrase, list_base, scorer=fuzz.token_set_ratio, limit=30)
    return list_match[0]


def xls_to_json(xls_path, json_path):
    """ Convert xls file with columns named ICD and KPI to json file.
    Due to internal data structure this approach is better than built-in pandas tool.

    Args:
        xls_path (string): path to xls file - input.
        json_path (string): path to json file - output.

    Returns:
        list of tuples: list of pairs word-confidence.
    """

    xls_data = pd.read_excel(xls_path)
    icd_list = data['ICD'].tolist()
    kpi_list = data['KPI'].tolist()

    icd_new = [str(tuple(ast.literal_eval(i))) for i in one_list]
    kpi_new = [ast.literal_eval(i) for i in two_list]

    dict_data = dict(zip(icd_new, kpi_new))
    with open(json_path, "w") as outfile:
        json.dump(dict_data, outfile, ensure_ascii=False, indent = 4)
    return f"Json file created: {json_path}"


def process_html(html_path, threshold, icd_codes=None):
    """ Parse html, get ICD-10, procedures and find completed procedures due to rules.

    Args:
        html_path (string): path to html file.
        threshold (int): treshold to accept phrase predictions.
        icd_codes (list of strings): list of ICD-10 codes.
    Returns:
        tuple: returns first ICD-10 code, corresponding procedures and completed procedures as a tuple.
    """

    html_parsed = parse_html(html_path)
    if not icd_codes:
        icd_codes = []
        for i in html_parsed:
            icd_codes.extend(icd_regex(i))
    treatments = icd_treatment(icd_codes)
    first_pair = next(iter(treatments.items())) # Take first key-value pair
    phrases = [phrase_detect(first_pair[1], i) for i in html_parsed] # Compare and detect similar phrases
    phrases = list(filter(lambda x: x[1] > threshold, phrases)) # Keep only detections with confidence > threshold
    phrases = list(set([i for i in phrases])) # Remove similar tuples
    return first_pair[0], first_pair[1], phrases


def test():
    start = time.time()
    result = process_html('data/SMSV8_v.3.4.html', 60)
    end = time.time() - start
    print(f'ICD-10 CODE: {result[0]} \
          \n\nPROCEDURES: {result[1]} \
          \n\nCOMPLETED PROCEDURES: {result[2]} \
          \n\nTOTAL TIME: {end}')


if __name__ == "__main__":
    test()
