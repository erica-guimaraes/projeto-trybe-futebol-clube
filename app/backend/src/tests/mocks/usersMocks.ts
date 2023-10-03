const mockUserCorrect = {
  email: 'user@user.com',
  password: 'password',
}

const mockToken = {
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjU0NTI3MTg5fQ.XS_9AA82iNoiVaASi0NtJpqOQ_gHSHhxrpIdigiT-fc"
}

const mockUserWithoutEmail = {
  password: 'password',
}

const mockUserWithoutPassword = {
  email: 'user@user.com',
}

export {
  mockToken,
  mockUserCorrect,
  mockUserWithoutEmail,
  mockUserWithoutPassword
}

