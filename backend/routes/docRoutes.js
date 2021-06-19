const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')

// В этом роуте будут врачи и поиск по врачам. 

// Скрин врачей будет подгружать информацию из БД. 
// Компонент header и компонент профиля будет брать данные из localStorage уже на клиенте.
// Информационный компонент по дефолту будет выдвать время, количество докторов и пользователй на сайте, при клике на новость будет выдавать информацию о враче, дате создания новости.
// Информация о доключенном устройстве будет поступать предположительно через Firebase по ajax.

const { getDoctors, getDoctorById, addDocToSub } = require('../controllers/docController')

router.route('/')
    .get(getDoctors)
    .post(protect, addDocToSub)
router.route('/:id').get(getDoctorById)

module.exports = router