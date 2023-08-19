import {
  auth, signOut, db, doc, getDoc, collection, addDoc, serverTimestamp, query, where,
  onSnapshot, deleteDoc
} from "./firebase.js";


const signout = document.getElementById("signout");

signout && signout.addEventListener("click", () => {
  signOut(auth).then(() => {
    localStorage.clear()
    window.location.href = "index.html"
  }).catch((error) => {
    console.log(error)
  });
})



  if (window.location.pathname != "/index.html")
    if (!localStorage.uid) {
      window.location.pathname = "/index.html";
    }

const getUserData = async () => {
  const docSnap = await getDoc(doc(db, "users", localStorage.getItem("uid")));
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    localStorage.setItem("username", docSnap.data().username)
    localStorage.setItem("image", docSnap.data().image)
    const profileName = document.getElementById("profile-name")
    profileName.innerHTML = `${docSnap.data().username}`
    console.log(localStorage.getItem("username"))
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }

}
getUserData()


const submitBlog = document.getElementById("submitBlog")

submitBlog && submitBlog.addEventListener("click", async () => {
  const usernameInput = document.getElementById("usernameInput")
  const postInput = document.getElementById("postInput")


  const docRef = await addDoc(collection(db, "Blogs"), {
    title: usernameInput.value,
    post: postInput.value,
    timestamp: serverTimestamp(),
    username: localStorage.getItem("username"),
    email: localStorage.getItem("email"),
    uid: localStorage.getItem("uid"),
    image: localStorage.getItem("image")

  });
  console.log("Document written with ID: ", docRef.id);
  usernameInput.value = ""
  postInput.value = ""

})

const getBlogData = () => {
  const q = query(collection(db, "Blogs"), where("uid", "==", `${localStorage.getItem("uid")}`));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    let mains = document.getElementById("main-box")
    mains.innerHTML = ""
    querySnapshot.forEach((doc) => {
      let date = new Date(doc.data().timestamp.seconds)

      mains.innerHTML += `
      <div class="main-box mb-4">
      <div class="main-box-div-1">
                  <div class="main-box-img">
                      <img src="${doc.data().image|| "images/default-photo.png"}" alt="">
                  </div>
                  <div class="main-box-div-1-text">
                      <p><b>${doc.data().title}</b></p>
                    <p><span > ${doc.data().username}</span> <span id="time">${date.toLocaleString()}</span></p>
                  </div>
              </div>

              <div class="main-box-div-2">
                  <p class="blogpara">${doc.data().post}</p>

                  <div class="main-box-div-2-anchor">
                  
                          <P style="cursor:pointer" onclick="dlt('${doc.id}')">Delete</P>
                     
                     
                  </div>
              </div>
      </div>
      `
    });

  });

}
getBlogData()


const getAllData = () => {
  const q = query(collection(db, "Blogs"));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {

    querySnapshot.forEach((doc) => {
      let date = new Date(doc.data().timestamp.seconds)
      let mainIndex = document.getElementById("main-index")
      mainIndex.innerHTML += `
        <div class="main-box mb-4">
        <div class="main-box-div-1">
                    <div class="main-box-img">
                        <img src="${doc.data().image|| "images/default-photo.png" } " alt="">
                    </div>
                    <div class="main-box-div-1-text">
                        <p><b>${doc.data().title}</b></p>
                      <p><span > ${doc.data().username}</span> <span id="time">${date.toLocaleString()}</span></p>
                    </div>
                </div>
  
                <div class="main-box-div-2">
                    <p class="blogpara">${doc.data().post}</p>
  
                    <div class="main-box-div-2-anchor">
                    
                    <a href="selecteduser.html?uid=${
                      doc.data().uid
                    }" class="card-link text-decoration-none">See all from this user</a>                       
                       
                    </div>
                </div>
        </div>
        `

        
    });

  });

}

getAllData()


const dlt = async (id) => {
  await deleteDoc(doc(db, "Blogs", id));
}

window.dlt = dlt
  





const usrdta = () =>{
  const usr= document.getElementById("profile-name")
  const a =localStorage.getItem("username")
usr.innerHTML += `${a}`  
}
usrdta()