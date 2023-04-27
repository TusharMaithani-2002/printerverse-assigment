  
  
  // bugy code
  $: window.addEventListener('click',function(e){
     if (document.getElementById('main').contains(e.target)){
        document.getElementById("hello").innerText = "Hello " + title
         Object.keys(text).forEach(key => {
          text[key] = Math.random() > 0.5;
        })
      }
  })
  
  // debugged code, creating a handler to avoid event bubbling
  $: window.addEventListener('click', handleClick)
  function handleClick(e) {
    if (document.getElementById('main').contains(e.target)){
        document.getElementById("hello").innerText = "Hello " + title
         Object.keys(text).forEach(key => {
          text[key] = Math.random() > 0.5;
        })
      }
    }


