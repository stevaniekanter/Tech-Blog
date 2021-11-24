const editPostFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#title').value.trim();
    const content = document.querySelector('#content').value.trim();
    const postId = document.querySelector('#postId').value.trim();
  
    if (title && content) {
      const response = await fetch('/api/posts/'+postId, {
        method: 'PUT',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location ="/dashboard";
      } else {
        alert('Sorry, failed to edit post');
      }
    }
  };
  
  const deletePostFormHandler = async (event) => {
    event.preventDefault();

    
    const postId = document.querySelector('#postId').value.trim();
      const response = await fetch('/api/posts/'+postId, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location ="/dashboard";
      } else {
        alert('Sorry, failed to delete post');
      }
  };

  document
    .querySelector('#editPost')
    .addEventListener('submit', editPostFormHandler);

  document
    .querySelector('#delete')
    .addEventListener('click', deletePostFormHandler);