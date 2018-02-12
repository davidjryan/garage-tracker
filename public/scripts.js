$(document).ready(function() {
  fetchItems();
})

const appendItems = (items) => {
  items.forEach((item, index) => {
    $('#card-container').prepend(`
    <article id="card${item.id}">
        <div class="title-container">
          <h4 class="title">${item.lingers}</h4>
          <h5 class="clean">${item.clean}</h5>
        </div>
        <hr>
        <p class="reason" >${item.reason}</p>
      </article>`)
  })

  $('#card-container').on('click', (event) => selectItem(event));
}

const fetchItems = async () => {
  const itemsFetch = await fetch('http://localhost:3000/api/v1/garage/')
  const itemsData = await itemsFetch.json()

  appendItems(itemsData.items)
  cardCount(itemsData.count)
  
  return ;
}

const submitItem = () => {

}