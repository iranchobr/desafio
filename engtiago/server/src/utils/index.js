exports.handleCatchedError = (res, message, status = 500) => {
	const response = {
		message
	}
  
	if (message.search("\n") >= 0) {
		response.message = message.split("\n")
	}
  
	return res.status(status).json(response)
}