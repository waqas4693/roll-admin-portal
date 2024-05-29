import Roll from '../models/roll.js'
import WeaverName from '../models/weaverName.js'

export const addEmployeeRolls = async (req, res) => {
  try {
    const rollsData = req.body
    await Roll.insertMany(rollsData)
    res.status(200).json('Data Inserted')
  } catch (error) {
    res.status(500).send('Error saving rolls data: ' + error.message)
  }
}

export const getRollRecords = async (req, res) => {
  try {
    const { date, session } = req.query
    const rolls = await Roll.find({ date: new Date(date), session: session })
    res.status(200).json(rolls)
  } catch (error) {
    res.status(500).send('Error fetching rolls data: ' + error.message)
  }
}

export const getSizeBasedReports = async (req, res) => {
  try {
    const sizes = await Roll.distinct('size')
    const result = {}

    for (const size of sizes) {
      const rollIds = await Roll.find({ size }).distinct('_id')
      const rollCount = rollIds.length
      const weaverNames = await WeaverName.find({ rollId: { $in: rollIds } })

      let missPrintCount = 0
      let missPickCount = 0
      let freshBagCount = 0

      for (const weaverName of weaverNames) {
        if (weaverName.missPrint) missPrintCount++
        if (weaverName.missPick) missPickCount++
        if (weaverName.freshBag) freshBagCount++
      }

      result[size] = {
        count: rollCount,
        missPrint: missPrintCount,
        missPick: missPickCount,
        freshBag: freshBagCount
      }
    }

    res.status(200).json(result)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error' })
  }
}

export const updateRollData = async (req, res) => {
  try {
    const rollId = req.params.rollId
    const updatedRollData = req.body

    await Roll.findByIdAndUpdate(rollId, updatedRollData)

    if (updatedRollData.weaverNames && updatedRollData.weaverNames.length > 0) {
      await WeaverName.deleteMany({ rollId })
      await WeaverName.insertMany(
        updatedRollData.weaverNames.map(weaverName => ({
          ...weaverName,
          rollId
        }))
      )
    }

    res
      .status(200)
      .json({ success: true, message: 'Roll data updated successfully' })
  } catch (error) {
    console.error('Error updating roll data:', error)
    res.status(500).json({ success: false, error: 'Error updating roll data' })
  }
}

export const deleteRollData = async (req, res) => {
  const rollId = req.params.rollId

  try {
    const rollDeleteResult = await Roll.findByIdAndDelete(rollId)

    if (!rollDeleteResult) {
      return res.status(404).json({ error: 'Roll data not found.' })
    }

    const weaverDeleteResult = await WeaverName.deleteMany({ rollId })

    res.status(200).json({
      message: 'Roll data and associated weaver names deleted successfully.',
      rollDeleteResult,
      weaverDeleteResult
    })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ error: 'Internal server error.' })
  }
}
