const defaultUser = 'octocat'; 
const userAPIUrl = `https://api.github.com/users/${defaultUser}`;

const githubUserBlock = document.getElementById('github_user'); 
const input = document.getElementById('get_user'); 
const search = document.getElementById('user_submit'); 

function createNode(element){
    return document.createElement(element); 
}

function append(parent,el){
    return parent.appendChild(el); 
}

function fetchGitUser(url){
    input.focus(); 
    fetch(url)
    .then((resp) => resp.json())
    .then(function(data){
        let user = data; 
        
        let wrapper = createNode('div'), 
            content = createNode('div'), 
            title = createNode('h4'), 
            img = createNode('img'), 
            link = createNode('a'), 
            info = createNode('p'), 
            warning = createNode('div');
        
        if(user.message == 'Not Found'){
            input.focus(); 
            githubUserBlock.innerHTML = ''; 
            
            warning.innerHTML = 'This user does not exist! Try something else'; 
            warning.classList.add('alert', 'alert-danger'); 
            
            append(githubUserBlock, warning); 
            return; 
         }   
            title.innerHTML = user.login; 
            link.href = user.html_url; 
            link.setAttribute('target', '_blank'); 
            img.src = user.avatar_url; 
            info.innerHTML = user.bio; 
            
            wrapper.classList.add('media-left'); 
            img.classList.add('media-object'); 
            content.classList.add('media-body'); 
            title.classList.add('media-heading'); 
            
            append(githubUserBlock, link); 
            append(link,wrapper); 
            append(link, content); 
            append(wrapper, img); 
            append(content, title); 
            append(content, info); 
        
    })
    .catch(function(error){
        console.log(error); 
    }); 
}

function searchUser(){
    const value = input.value; 
    const url = `https://api.github.com/users/${value}`;
    
    input.value = ''; 
    githubUserBlock.innerHTML = ''; 
    fetchGitUser(url); 
};

search.addEventListener('click', searchUser); 
input.addEventListener('keyup', function(e){
    if(e.keyCode == 13){
        searchUser(); 
    }
}); 

fetchGitUser(userAPIUrl);

