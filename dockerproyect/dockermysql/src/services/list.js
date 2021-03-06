// gets the products items
export function getList(done = () => { }) {
  fetch('http://localhost:4040/api/product/')
    .then(res => res.json())
    .then((data) => {
      done(data)
    })
    .catch((error) => {
      window.alert(error)
      done(null, error)
    })
}

// sends data to the api

export async function setItem(item) {
  const data = await fetch('http://localhost:4040/api/product/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(item)
  })
  return await data.json()
}
/*
export function setItem(item, done = () => {}) {
  fetch('http://localhost:4040/api/product/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(item)
  })
  .then((data) => {
      done(data.json())
    })
    .catch((error) => {
      console.log(error);
    });
}
*/

// Gets the category items
export async function getCategory() {
  const data = await fetch('http://localhost:4040/api/category/')
  return await data.json()
}

// update data
export async function updateItem(item) {
  const data = await fetch(`http://localhost:4040/api/product/${item.idproducts}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(item)
  })
  return await data.json()
}


