import React, { useState,useEffect }  from "react";
function App(){
  const blogtitle = React.useRef<any>(null);
  const blogtext = React.useRef<any>(null);
  const [blogdata,setBlogData]=useState([])
  useEffect(()=>{
    fetch('https://blogpostexpressserver.onrender.com/')
      .then((res) => res.json())
      .then((data) => setBlogData(data));
  },[])

  
  const handleSubmit = (e:any) => {
    e.preventDefault();
    const data = {
      title: blogtitle.current?.value,
      btext: blogtext.current?.value,
    };
    console.log(data)
    fetch('https://blogpostexpressserver.onrender.com/')
      .then((res) => res.json())
      .then((data) => setBlogData(data));

    fetch('https://blogpostexpressserver.onrender.com/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((sres) => console.log(sres))
      .catch((error) => console.log(error.message));
  };


  return <div>
   <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label htmlFor="Blog Title">Title</label>
          <input type="text" name="blogtitle" ref={blogtitle} />
        </div>
        <div>
          <label htmlFor="blogtext">Blog Text</label>
          <div>
            <textarea
              name="blogtext"
              id="blogtext"
              cols={50}
              rows={5}
              ref={blogtext}
            ></textarea>
          </div>
        </div>
        <div>
          <button>Submit</button>
        </div>
      </form>
    </div>

    <div>
      <h2>Blog Posts</h2>
      {
        blogdata.map((item:any)=>(
          <div>
            <li>{item && item.title}</li>
            <li>{item && item.btext}</li>
          </div>  
        ))
      }
    </div>
  </div>
}

export default App;