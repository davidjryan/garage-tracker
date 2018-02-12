$(document).ready(function() {
  fetchItems();
})

const prependItems = (items) => {
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

  prependItems(itemsData.items)
  cardCount(itemsData.count)
  cleanCount(itemsData.items)

  return;
}

const submitItem = async () => {
  const lingers = $('#linger-input').val();
  const clean = $('#clean-input').val();
  const reason = $('#reason-input').val();

  const savePost = await fetch('http://localhost:3000/api/v1/garage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ lingers, clean, reason })
  });

  const response = await savePost.json();
  console.log(response)

  prependItems([{ lingers, clean, reason, id: response.id }])
  cardCount(1)

  $('.header-input').val('');
};

const cardCount = (count) => {
  console.log($('#card-count').text())
  let cardCount = parseInt($('#card-count').text())
  let totalCount = cardCount += count
  $('#card-count').text(totalCount)
}

const cleanCount = (items) => {
  
}

const selectItem = (event) => {

}

$('#submit-input').on('click', submitItem)