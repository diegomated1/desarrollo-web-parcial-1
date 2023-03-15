import products from './data/products.json' assert {type: 'json'};

class Product{

    constructor(){
        this.products = products;
        this.id = document.getElementById("product-info-id");
        this.title = document.getElementById("product-info-title");
        this.description = document.getElementById("product-info-description");
        this.amount = document.getElementById("product-info-amount");
        this.price = document.getElementById("product-info-price");
        this.discount = document.getElementById("product-info-discount");
        this.discountPer = document.getElementById("product-info-discount-per");
        this.discountUni = document.getElementById("product-info-discount-uni");
        this.image = document.getElementById("product-info-image");

        this.btnAdd = document.getElementById("product-btn-add");
        this.btnEdt = document.getElementById("product-btn-edt");
        this.btnDel = document.getElementById("product-btn-del");

        this.productPrevius = document.getElementById("product-info-previus");
        this.productNext = document.getElementById("product-info-next");
        this.productSave = document.getElementById("product-info-save");

        this.modal = new Modal(this);

        this.current = 0;
        this.render();
        this.addListener();
    }

    addListener(){
        this.productPrevius.addEventListener('click', ()=>{
            this.current -= 1;
            if(this.current==-1){
                this.modal.render('Error', 'Primer producto', ()=>{
                    this.current = this.products.length-1;
                    this.render();
                });
            }else{
                this.render();
            }
        });
        this.productNext.addEventListener('click', ()=>{
            this.current += 1;
            if(this.current==this.products.length){
                this.modal.render('Error', 'No hay mas registros', ()=>{
                    this.current = 0;
                    this.render();
                });
            }else{
                this.render();
            }
        });
        this.productSave.addEventListener('click', ()=>{
            this.products.push({
                id: this.products.length,
                title: this.title.value,
                description: this.description.value,
                amount: this.amount.value,
                price: this.price.value,
                discount: this.discount.value,
                discountPer: this.discountPer.value,
                discountUni: this.discountUni.value,
                favourite: false
            });
            this.current = this.products.length - 1;
            this.modal.render('Info', 'Producto guardado', ()=>{
                this.productSave.hidden = 'hidden';
                this.productPrevius.disabled = false;
                this.productNext.disabled = false;
                this.render();
            });
        });
        this.discount.addEventListener('change', (e)=>{
            if(e.target.value=="1"){
                this.discountPer.disabled = false;
                this.discountUni.disabled = false;
                if(this.products[this.current]){
                    this.discountPer.value = this.products[this.current].discountPer;
                    this.discountUni.value = this.products[this.current].discountUni;
                }
            }else{
                this.discountPer.value = "";
                this.discountUni.value = "";
                this.discountPer.disabled = true;
                this.discountUni.disabled = true;
            }
        });
        this.btnAdd.addEventListener('click', ()=>{
            this.current = -1;
            this.id.value = "";
            this.title.value = "";
            this.description.value = "";
            this.amount.value = "";
            this.price.value = "";
            this.discount.value = "";
            this.discountPer.value = "";
            this.discountUni.value = "";
            this.image.src = "";
            this.productPrevius.disabled = true;
            this.productNext.disabled = true;
            this.productSave.hidden = false;
        });
        this.btnEdt.addEventListener('click', ()=>{
            this.products[this.current] = {
                id: this.id.value,
                title: this.title.value,
                description: this.description.value,
                amount: this.amount.value,
                price: this.price.value,
                discount: this.discount.value,
                discountPer: this.discountPer.value,
                discountUni: this.discountUni.value,
                favourite: false
            };
            this.modal.render('Info', 'Producto guardado');
        });
        this.btnDel.addEventListener('click', ()=>{
            this.products = this.products.slice(0, this.current).concat(this.products.slice(this.current+1,this.products.length));
            this.current = (this.current==this.products.length) ? this.products.length-1 : this.current;
            this.modal.render('Info', 'Producto eliminado', ()=>{
                this.render();
            });
        });
    }

    render(){
        console.log(this.products[this.current]);
        this.id.value = this.products[this.current].id;
        this.title.value = this.products[this.current].title;
        this.description.value = this.products[this.current].description;
        this.amount.value = this.products[this.current].amount;
        this.price.value = this.products[this.current].price;
        if(this.products[this.current].discount){
            this.discount.value = "1";
            this.discountPer.value = this.products[this.current].discountPer;
            this.discountUni.value = this.products[this.current].discountUni;
        }else{
            this.discount.value = "0";
            this.discountPer.value = "";
            this.discountUni.value = "";
            this.discountPer.disabled = "true";
            this.discountUni.disabled = "true";
        }
        this.image.src = `./images/${this.products[this.current].id}.jpg`;
    }

}


class Modal{

    constructor(product){
        this.product = product;
        this.overlay = document.getElementById('overlay');
        this.modal = document.getElementById("modal");
        
        this.header = document.getElementById("modal-title");
        this.body = document.getElementById("modal-body-text");

        this.btnTop = document.getElementById("button-close-top");
        this.btnBottom = document.getElementById("button-close-bottom");
    }

    changeVisibility(visible){
        this.modal.style.visibility = visible ? 'visible' : 'hidden';
        this.overlay.style.display = visible ? 'block' : 'none';
    }

    addListener(cb){
        this.btnTop.addEventListener('click', ()=>{
            this.changeVisibility(false);
            if(cb) cb();
        });
        this.btnBottom.addEventListener('click', ()=>{
            this.changeVisibility(false);
            if(cb) cb();
        });
    }

    render(header, text, cb){
        this.header.innerHTML = header;
        this.body.innerHTML = text;
        this.changeVisibility(true);
        document.getElementsByClassName("container")[0].style.backgroundColor = 'red';
        this.addListener(cb);
    }
}

const product = new Product();

