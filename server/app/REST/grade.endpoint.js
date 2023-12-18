import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import gradesManager from '../business/grades.manager';
import finalGradesManager from '../business/finalGrades.manager';

export const gradeEndpoint = (router) => {

// Endpointy dla ocen
router.get('/grades/:subjectId', async (req, res) => {
  try {
    const subjectId = req.params.subjectId;
    const grades = await gradesManager.create().getGradesBySubject(subjectId);
    res.json(grades);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/grades/all', async (req, res) => {
  try {
    const grades = await gradesManager.create().getAllGrades();
    res.json(grades);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/grades', [
  body('value').isNumeric().notEmpty(),
  body('weight').isNumeric().optional(),
  body('comment').isString().optional(),
  body('subjectId').isString().notEmpty(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const gradeData = req.body;
    const createdGrade = await gradesManager.create().createOrUpdateGrade(gradeData);
    res.json(createdGrade);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/grades/:gradeId', [
  body('value').isNumeric().notEmpty(),
  body('weight').isNumeric().optional(),
  body('comment').isString().optional(),
  body('subjectId').isString().notEmpty(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // console.log('z endpointa błąd', errors.array()); 
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const gradeId = req.params.gradeId;
    const gradeData = req.body;
    gradeData.gradeId = gradeId;
    // console.log(gradeId, ' + ', gradeData, 'gradeId + gradeData');
    const updatedGrade = await gradesManager.create().createOrUpdateGrade(gradeData);
    res.status(200).json(updatedGrade);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/grades/:gradeId', async (req, res) => {
  try {
    const gradeId = req.params.gradeId;
    await gradesManager.create().deleteGrade(gradeId);
    res.json({ message: 'Grade deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpointy dla ocen końcowych
router.get('/finalGrades/:subjectId', async (req, res) => {
  try {
    const subjectId = req.params.subjectId;
    const finalGrades = await finalGradesManager.create().getFinalGradesBySubject(subjectId);
    res.json(finalGrades);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/finalGrades', [
  body('value').isNumeric().notEmpty(),
  body('subjectId').isString().notEmpty(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const finalGradeData = req.body;
    const createdFinalGrade = await finalGradesManager.create().createOrUpdateFinalGrade(finalGradeData);
    res.json(createdFinalGrade);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/finalGrades/:finalGradeId', [
  body('value').isNumeric().notEmpty(),
  body('subjectId').isString().notEmpty(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const finalGradeId = req.params.finalGradeId;
    const finalGradeData = req.body;
    finalGradeData.finalGradeId = finalGradeId;
    const updatedFinalGrade = await finalGradesManager.create().createOrUpdateFinalGrade(finalGradeData);
    res.json(updatedFinalGrade);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/finalGrades/:finalGradeId', async (req, res) => {
  try {
    const finalGradeId = req.params.finalGradeId;
    await finalGradesManager.create().deleteFinalGrade(finalGradeId);
    res.json({ message: 'Final grade deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

};
