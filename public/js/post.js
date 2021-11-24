const postFormHandler = async (event) => {

    event.preventDefault();
    const title = document.querySelector('#title').value.trim();
    const content = document.querySelector('#content').value.trim();
  
    if (title && content) {
      const response = await fetch('/api/posts/', {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location ="/dashboard";
      } else {
        alert('Sorry, failed to create a Post');
      }
    }
  };
  
  document
    .querySelector('#addPost')
    .addEventListener('submit', postFormHandler);