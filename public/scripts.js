$(document).ready(function() {
  fetchItems();
})

const prependItems = (items) => {
  items.forEach((item, index) => {
    $('#card-container').prepend(`
    <article id="card${item.id}" class="card">
        <div class="title-container">
          <h4 class="title">${item.lingers}</h4>
          <h5 class="clean">${item.clean}</h5>
        </div>
        <div class="body">
          <hr>
          <p class="reason" >${item.reason}</p>
        </div>
      </article>`)
  })

  $('#card-container').on('click', selectItem(event));
}

const fetchItems = async () => {
  const itemsFetch = await fetch('https://localhost:3000/api/v1/garage/')
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

  const savePost = await fetch('https://localhost:3000/api/v1/garage', {
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
  cleanCount([{ clean }])

  $('.header-input').val('');
};

const cardCount = (count) => {
  console.log($('#card-count').text())
  let cardCount = parseInt($('#card-count').text())
  let totalCount = cardCount += count

  $('#card-count').text(totalCount)
}

const cleanCount = (items) => {
  const cleanObject = items.reduce((accu, ele) => {
    if (ele.clean in accu) {
      accu[ele.clean]++;
    } else {
      accu[ele.clean] = 1;
    }
    return accu
  }, {})

  let sparkleCount = parseInt($('#sparkle-count').text())
  let dustyCount = parseInt($('#dusty-count').text())
  let rancidCount = parseInt($('#rancid-count').text())

  let totalSparkle = sparkleCount += cleanObject.Sparkling || 0
  let totalDusty = dustyCount += cleanObject.Dusty || 0
  let totalRancid = rancidCount += cleanObject.Rancid || 0

  $('#sparkle-count').text(totalSparkle)
  $('#dusty-count').text(totalDusty)
  $('#rancid-count').text(totalRancid)
}

function selectItem() {
  console.log($(this))
  const card = $(event.target).toggleClass('active')
 
}

const cardAccend = () => {
  
}

const cardDescend = () => {

}
 

$('#accend').on('click', cardAccend)
$('#decend').on('click', cardDescend)
// $('.card').on('click', selectItem())
$('#submit-input').on('click', submitItem)