import re
import cv2
import icd10
import json
import PyPDF2
import html2text
import numpy as np
import pandas as pd

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
        list: list of all icd-10 codes in text.
    """

    pattern = r'[A-Z]\d+\.?\d+?'
    icd_codes = re.findall(pattern, text)
    return icd_codes

def parse_image(image_path):
    """ Find ICD-10 codes in the image.

    Args:
        image_path (string): image path to process.

    Returns:
        list: list of all icd-10 codes in image.
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
        list: list of all icd-10 codes in pdf.
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
        dict: {'icd code': ['treatment', 'plan']}.
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
    """ Convert xls file with columns ICD and KPI to json file.
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
        json.dump(dict_data, outfile, ensure_ascii = False, indent = 4)
    return f"Json file created: {json_path}"

def test():
    list_base = ['привет', 'как дела', 'пойдем']
    phrase = 'делы'
    #phrase_detect_result = phrase_detect(list_base, phrase)
    #parse_image_result = parse_image('photo_2021-06-10_09-49-26.jpg')
    #find_icd_block_result = find_icd_block(parse_image_result)
    #icd_treatment_result = icd_treatment(['J34.2'])
    #parse_pdf_result = parse_pdf('data/epic.pdf')
    #print('parse_pdf result:', parse_pdf_result)
    #print('phrase_detect result:', phrase_detect_result)
    #print('parse_image result:', parse_image_result)
    #print('code_block result:', find_icd_block_result)
    #print('icd_treatment_result:', icd_treatment_result)
    parse_html_result = parse_html('data/SMSV8_v.3.4.html')
    res = []
    for i in parse_html_result:
        res.extend(icd_regex(i))
    print(res)
    treatments = icd_treatment(res)
    print(treatments)

if __name__ == "__main__":
    test()
