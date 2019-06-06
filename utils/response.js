exports.success = (req, res, response) => {
  console.log('success', response)
  return res.status(200).send(
    {
      status: 200,
      message: 'Success',
      data: response
    }
  )
}

exports.notFound = (req, res, error) => {
  console.error('not found', error)
  return res.status(404).send(
    {
      status: 404,
      message: 'Not Found',
      error: error
    }
  )
}

exports.failed = (req, res, error) => {
  console.error('failed', error)
  return res.status(500).send(
    {
      status: 500,
      message: 'Failed',
      error: error
    }
  )
}
