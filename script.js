
//loading All post 
const allPost = async (postCetagory) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${postCetagory}`);
    const data = await res.json();
    console.log(data.posts);
    
    const postContainer = document.getElementById('post-conatiner');

    // clear old data in post container 
    postContainer.textContent = '';

    data.posts.forEach((postItem) => {
        // console.log(postItem.title);    
        const div = document.createElement('div');
        div.innerHTML = `
        <div class=" mb-5 border-2 border-[#797DFC] rounded-xl bg-[#797dfc1a] flex gap-3 p-5">

        <div>
            <div class="indicator">
                <span class="indicator-item badge bg-green-600"></span>
                <div class="grid w-32 h-32 bg-base-300 place-items-center">
                <img src="${postItem.image}" alt="">
                </div>
            </div>
        </div>
        <div>
            <div class="flex gap-4 text-lg font-bold">
                <h1>#${postItem.category}</h1>
                <h1>authore : <span>${postItem.author.name}</span></h1>
            </div>
            <h1 class="text-2xl font-bold my-4">${postItem.title}</h1>
            <p class="text-xl text-[#12132d99] font-bold">${postItem.description}</p>
            <hr class="my-4">
            <div class="flex justify-between">
                <ul class="flex gap-5 text-[#12132d99] text-2xl">
                    <li class=""><i class="fa-regular fa-message"></i><span class="ml-4">
                    ${postItem.comment_count}</span>
                    </li>
                    <li><i class="fa-solid fa-eye"></i><span class="ml-4">
                    ${postItem.view_count}</span></li>
                    <li><i class="fa-regular fa-clock"></i><span class="ml-4">
                    ${postItem.posted_time} min</span></li>

                </ul>

                <!-- mark as read btn  -->
                <div id="read-btn" class="text-3xl text-green-600">
                    <button  onclick="clicked('${postItem.title}','${postItem.view_count}')">
                    <i class="fa-solid fa-envelope-circle-check"></i> 
                    </button>
                </div>

            </div>
        </div>    
     </div>
        `;
        postContainer.appendChild(div);

    });
    
}

//searching handelar
function searching(){
    const searchInput = document.getElementById('search-input').value;  
    const resu = allPost(searchInput);
    
}

//clicked use as read button 
function clicked(postTitle, view) {
   
    //find read list container
    const readCountList = document.getElementById('read-count-list');
    // show read list 
    const div = document.createElement('div');
    div.innerHTML = `
    <div class=" mb-5 p-5 bg-white rounded-2xl flex gap-5  w-80">
        <h1 class="text-xl font-bold">${postTitle}</h1>
        <div class="flex items-center text-2xl">
            <i class="fa-solid fa-eye "></i><span class="ml-4">${view}</span>
        </div>
    </div>
    `;
    readCountList.appendChild(div);

}

//loading Latest Posts
const latestPost = async ()=>{
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
    const data = await res.json();
    // console.log(data);
    data.forEach((item ) => {
        const latestPost = document.getElementById('latest-post');
        const div = document.createElement('div');
        div.classList.add('card','w-96', 'bg-base-100', 'border')
        div.innerHTML = `
        <figure class="px-10 pt-10">
        <img src="${item.cover_image}" alt="Shoes"
            class="rounded-xl" />
        </figure>
    <div class="card-body ">
        <div class="flex gap-3 items-center">
            <i class="fa-regular fa-calendar-days"></i>
            <p id="post-date">${item.author.posted_date ? `${item.author.posted_date}` : 'No publish date'}</p>
        </div>
        <h2 class="card-title">${item.title}</h2>
        <p>${item.description}</p>
        <div class="card-actions flex gap-5 items-center">
            <img class="w-20 rounded-full " src="${item.profile_image}" alt="">
            <div class="">
                <h1 class="font-semibold text-xl">${item.author.name}</h1>
                <p>${item.author.designation ? `${item.author.designation }` : 'Unknown'}</p>
            </div>
        </div>

    </div>
        `;
       
        latestPost.appendChild(div);
        // const postDate = document.getElementById('post-date').innerText;
        // if(item.author.posted_date === true){
        //     postDate.innerHTML = '${item.author.posted_date}';
        // }
        // else{
        //     postDate.innerHTML = 'Unknown';
        // }
        
    });
}

allPost('Comedy');
latestPost();