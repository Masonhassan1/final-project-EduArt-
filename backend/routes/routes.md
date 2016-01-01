
### gültige Routen

app.use("/", homeRouter)
app.use("/home", homeRouter)

---
app.use("/", authyRouter)
- router.route("/")
   - .post("/register", postRegister)
   - .post("/login", postLogIn )
   - .post("/logOut", postLogOut)

---
app.use("/user", userRouter)
- router.route("/")
   - .get(userList)
- router.route("/:id")
   - .get(findUser)                    --> userIdId
   - .patch(updateUser)                --> userIdId   --> req.body
- router.route("/updateimage/:id")
   - .patch(updateUserImage)
- router.route("/deactivateUser/:id")
   - .patch(deactivateUser)         --> userIdId   --> active: false

---
app.use("/mylearningdesk", myLearningDeskRouter)
- router.route("/")
   - .get(listAllLearningDesks)
   - .post(addALearningDesk); --> userId
- router.route("/:id")
   - .get(findALearningDesk)        --> learningDeskId
   - .patch(addACourseOnDesk)       --> learningDeskId --> courseId
   - .delete(deleteALearningDesk);  --> learningDeskId

---
app.use("/mypurchases", myPurchaseRouter )
- router.route("/")
   - .get(allPurchases)
   - .post(addAPurchase); --> courseId, --> userId, --> LearningDeskId
- router.route("/:id")
   - .get(findPurchase) ---> purchaseId

---
app.use("/mycertificat", myCertificatRouter)
- router.route("/")
   - .post(addACertificat) --> courseId, --> userId
- router.route("/:id")
   - .get(findACertificat) --> certificatId

---
app.use("/courses", courseRouter)
- router.route("/")
   - .get(allCourses)
   - .post(addCourse)
- router.route("/:id")
   - .get(findCourse)      ---> courseId
   - .delete(deleteCourse) ---> courseId
   - .patch(updateCourse)
  
- router.route("/addmoduleonacourse/:id")
   - .patch(addModuleOnACourse)
 
- router.route("/deletemodulefromacourse/:id")
   - .patch(deleteAModulefromACourse)

---
app.use("/modules", moduleRouter)
- router.route("/")
   - .get(allModules)
   - .post(addModule)
- router.route("/:id")
   - .get(findModule)         --> moduleId
   - .delete(deleteModule)    --> moduleId
   - .patch(updateModules)    --> moduleId
