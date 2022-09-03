const loadCategory = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayCatagory(data.data.news_category))
}

const displayCatagory = categories => {
    const containerCategory = document.getElementById('container-catagory');
    categories.forEach(category => {
        // console.log(category)
        const categoryUl = document.createElement('ul');
        categoryUl.classList.add('navbar-nav');
        categoryUl.innerHTML = `
        <li class="nav-item">
            <a onclick="gettingCategoryDetails(${category.category_id})" class="nav-link active" aria-current="page" href="#">${category.category_name}</a>
        </li>
        `;
        containerCategory.appendChild(categoryUl);   
    });
}


const gettingCategoryDetails = categoryId => {
    const url = `https://openapi.programming-hero.com/api/news/category/0${categoryId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayCategoryNews(data.data))
        toggleingSpinner(true)
}

const displayCategoryNews = newses => {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = ``;
    newses.forEach(news => {
        console.log(news)
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('card')
        newsDiv.classList.add('mb-5')
        newsDiv.innerHTML = `
        <div class="row g-0 d-flex align-items-center p-4">
            <div class="col-sm-12 col-md-2">
                <img class="img-fluid" src="${news.thumbnail_url}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-10">
                <div class="card-body">
                    <h5 class="card-title">${news.title}</h5>
                    <p class="card-text">${news.details.slice(0, 500)}...</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="d-flex">
                            <div>
                                <img style="width: 50px;" class="img-fluid rounded-circle" src="${news.author.img}">
                            </div>
                            <div class="ms-3">
                                <p class="m-0">${news.author.name}</p>
                                <p class="m-0">${news.author.published_date}</p>
                            </div>
                        </div>
                        <div class="d-flex">
                            <div class="me-2"><i class="fa-solid fa-eye"></i></i></div>
                            <div><p>${news.total_view}</p></div>
                        </div>
                        <div class="d-flex">
                            <div class="me-2">
                                <p>${news.rating.number}</p>
                            </div>
                            <div>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-solid fa-star"></i>
                                <i class="fa-regular fa-star"></i>
                                <i class="fa-regular fa-star"></i>
                            </div>
                        </div>
                        <div>
                            <button onclick="newsDetailsInfo('${news._id}')" class="border-0 bg-transparent" type="button" data-bs-toggle="modal" data-bs-target="#newsDetails"><i
                                    class="fa-solid fa-arrow-right"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
        newsContainer.appendChild(newsDiv);
        
    })
    toggleingSpinner(false)
}



const newsDetailsInfo = info => {
    const url = `https://openapi.programming-hero.com/api/news/${info}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayNewsDetails(data.data[0]))
}

const displayNewsDetails = news => {
    console.log(news)
    const modalBodyInfo = document.getElementById('modal-body-info');
    modalBodyInfo.innerHTML = `
        <img class="img-fluid" src="${news.image_url}">
    `;
}

const toggleingSpinner = isLoading => {
    const loadingScene = document.getElementById('loader-scene');
    if(isLoading){
        loadingScene.classList.remove('d-none')
    }
    else{
        loadingScene.classList.add('d-none')
    }
}


loadCategory();