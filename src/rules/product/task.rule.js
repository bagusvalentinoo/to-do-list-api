const isDueDateLessThanToday = (dueDate) => {
  const today = new Date()
  const due = new Date(dueDate)

  return due < today
}

module.exports = { isDueDateLessThanToday }