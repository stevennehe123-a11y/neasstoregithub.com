// Produk Data
const productsData = [
    {id:1,name:'Veraldo',category:'sneakers',price:120000,img:'1.webp',rating:4},
    {id:2,name:'Pionyx',category:'sneakers',price:120000,img:'2.webp',rating:5},
    {id:3,name:'Moofeat Brigan ',category:'boots',price:197000,img:'5.webp',rating:4},
    {id:4,name:'Moofeat Alter',category:'boots',price:200000,img:'6.webp',rating:5},
    {id:5,name:'Injury',category:'Lari',price:400000,img:'8.webp',rating:3},
    {id:6,name:'RF Footwear',category:'Lari',price:420000,img:'9.webp',rating:4},
    {id:7,name:'Maxwells',category:'Lari',price:390000,img:'10.webp',rating:4},
    {id:8,name:'FED',category:'sneakers',price:600000,img:'3.webp',rating:5},
    {id:9,name:'TRAGEN Footwear Fleming',category:'boots',price:235000,img:'7.webp',rating:5},
    {id:10,name:'Leedoo',category:'sneakers',price:620000,img:'4.webp',rating:4}
];

const productsContainer = document.getElementById('products');
let cart = [];

// Render Produk
function renderProducts(products){
    productsContainer.innerHTML='';
    products.forEach(p=>{
        const div = document.createElement('div');
        div.className='product';
        let stars='';
        for(let i=0;i<5;i++){ stars+= i<p.rating ? '★' : '☆'; }
        div.innerHTML=`
            <img src="${p.img}" alt="${p.name}">
            <h3>${p.name}</h3>
            <div class="rating">${stars}</div>
            <p>Rp ${p.price}</p>
            <button onclick="addToCart(${p.id})">Beli Sekarang</button>
        `;
        productsContainer.appendChild(div);
    });
}

renderProducts(productsData);

// Filter & Search
function applyFilters(){
    const category = document.getElementById('categoryFilter').value;
    const search = document.getElementById('searchInput').value.toLowerCase();
    let filtered = productsData.filter(p=>{
        return (category==='all' || p.category===category) && p.name.toLowerCase().includes(search);
    });
    renderProducts(filtered);
}

function filterCategory(cat){
    document.getElementById('categoryFilter').value=cat;
    applyFilters();
}

// Cart Functions
function addToCart(id){
    const product = productsData.find(p=>p.id===id);
    cart.push(product);
    document.getElementById('cart-count').textContent = cart.length;
    showToast(`${product.name} ditambahkan ke keranjang`);
    updateCart();
}

function toggleCartModal(){
    const modal = document.getElementById('cartModal');
    modal.style.display = modal.style.display==='flex' ? 'none':'flex';
}

function updateCart(){
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    cartItems.innerHTML='';
    let total=0;
    cart.forEach((item,index)=>{
        total+=item.price;
        const div=document.createElement('div');
        div.textContent=`${item.name} - Rp ${item.price} `;
        const removeBtn=document.createElement('button');
        removeBtn.textContent='Hapus';
        removeBtn.onclick=()=>{cart.splice(index,1); updateCart(); document.getElementById('cart-count').textContent = cart.length;}
        div.appendChild(removeBtn);
        cartItems.appendChild(div);
    });
    cartTotal.textContent = total;
}

function checkout(){
    if(cart.length===0) return showToast('Keranjang kosong!');
    showToast('Terima kasih! Pembayaran berhasil.');
    cart=[];
    updateCart();
    document.getElementById('cart-count').textContent = cart.length;
    toggleCartModal();
}

// Toast
function showToast(message){
    const toast = document.getElementById('toast');
    toast.textContent=message;
    toast.className='show';
    setTimeout(()=>{toast.className=toast.className.replace('show','');},3000);
}

// Navbar toggle
function toggleNav(){ document.getElementById('nav-links').classList.toggle('active'); }

// Slider
let currentSlide=0;
const slides=document.querySelectorAll('.slide');
function showSlide(index){
    if(index>=slides.length) currentSlide=0;
    else if(index<0) currentSlide=slides.length-1;
    else currentSlide=index;
    const sliderContainer = document.querySelector('.slides');
    sliderContainer.style.transform = `translateX(-${currentSlide*100}%)`;
}
function nextSlide(){ showSlide(currentSlide+1); }
function prevSlide(){ showSlide(currentSlide-1); }
showSlide(0);
setInterval(nextSlide,5000);
