$(document).ready(function() {
  fetchItems();
})

const appendItems = (items) => {
  items.forEach((item, index) => {
    // make conditional -- if project.id exists don't append
    $('#card-container').prepend(`
    <article id="card${item.id}">
        <div class="title-container">
          <h4 class="title">${item.lingers}</h4>
        </div>
        <h5 class="clean">${item.clean}</h5>
        <hr>
        <p class="reason" >${item.reason}</p>
      </article>`)
  })

  $('.sub_menu').on('click', (event) => selectProject(event));
}

const fetchItems = async () => {
  const itemsFetch = await fetch('http://localhost:3000/api/v1/garage/')
   const itemsData = await itemsFetch.json()

  return appendItems(itemsData.items);
}

const submitItem = () => {
  
}