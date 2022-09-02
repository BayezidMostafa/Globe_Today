const loadCategory = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayCatagory(data.data.news_category))
}

const displayCatagory = categories => {
    const categoriesContainer = document.getElementById('category-container');
    categories.forEach(category => {
        console.log(category)
        const catDiv = document.createElement('div');
        catDiv.innerHTML = `
        <a onclick="gettingCategoryDetails(${category.category_id})" type="button" class="text-decoration-none text-dark">${category.category_name}</a>
        `;
        categoriesContainer.appendChild(catDiv);
    });
}


const gettingCategoryDetails = categoryId => {
    const url = `https://openapi.programming-hero.com/api/news/category/0${categoryId}`;
    fetch(url)
    .then(res => res.json())
    .then(data => console.log(data.data[0]))
}

const displayCategoryNews = newses => {
    const newsContainer = document.getElementById('news-container');
    newses.forEach(news => {
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('col')
    })
}

loadCategory()