var budget_btn = document.getElementById("budget-btn");
var budget = document.getElementById("budget");
var total_budget = document.getElementById("total-budget");
var product_btn = document.getElementById("expences-btn");
var title_expanse = document.getElementById("title");
var cost_expanse = document.getElementById("cost");
var expences_list = document.getElementById("expences-list");
var expences = document.getElementById("expences");
var balance = document.getElementById("balance");

// store budget in localstorage
budget_btn.onclick = function(e)
{
    e.preventDefault();
    if(budget.value != ""){
        localStorage.setItem("budget",budget.value);
        location.reload();
    }
    else{
        alert("Budget is emty!");
    }
}
// store product in localstorage
product_btn.onclick = function(e)
{
    e.preventDefault();
    if(title.value != "" && cost.value != ""){
        var p_title = title.value;
        var p_cost = cost.value;
        var data = {p_cost : p_cost , p_title : p_title};
        var string = JSON.stringify(data);
        localStorage.setItem("budget_" + title.value,string);
        location.reload();
    }
    else{
        alert("Expance is emty!");
    }
}
// data from localstorage
function all_data(){
    var i;
    for(i=0 ; i<localStorage.length ; i++){
        all_product = localStorage.key(i);
        if(all_product.match("budget_")){
            var json_data = localStorage.getItem(all_product);
            var json_parse = JSON.parse(json_data);
            expences_list.innerHTML += '<div class="row mt-3 b-border" style="border-left: 5px solid #5D3FD3;"><div class="col-md-6 mt-3 d-flex justify-content-between"><h5>'+json_parse.p_title+'</h5><h5 class="price">'+json_parse.p_cost+'</h5></div><div class="col-md-6 mt-3 d-flex justify-content-end"><i class="fa-solid fa-pen-to-square edit-btn"></i>&nbsp;&nbsp;&nbsp;&nbsp;<i class="fa-solid fa-trash delete-btn"></i></div></div>';
        }
    }
    var price_tag = document.getElementsByClassName("price");
    var price = [];
    for(i=0 ; i<price_tag.length ; i++){
        price[i] = price_tag[i].innerHTML;
    }
    var price_int = [];
    for (i = 0; i < price.length; i++) {
        price_int.push(parseInt(price[i]));
    }
    var final_price = 0;
    for(i=0 ; i<price_int.length ; i++){
        final_price += price_int[i];
    }
    expences.innerHTML = final_price;
    total_budget.innerHTML = localStorage.getItem("budget");
    
    var t_bgt = total_budget.innerHTML;
    var t_expance = expences.innerHTML;
    balance.innerHTML = t_bgt - t_expance;

    // delete expance
    var delete_btn = document.getElementsByClassName("delete-btn");
    for(i=0 ; i<delete_btn.length ; i++){
        delete_btn[i].onclick = function(){
            var cnf = window.confirm("Do you delete it?");
            if(cnf){
                var del_parent = this.parentElement;
                var div_parent = del_parent.parentElement;
                var h5 = div_parent.firstChild.childNodes[0].innerHTML;
                localStorage.removeItem("budget_"+h5);
                location.reload();
            }
            else{
                alert("Your data is safe!");
            }

        }
    }
    // Edit expance
    var edit_btn = document.getElementsByClassName("edit-btn");
    for (i = 0; i<edit_btn.length; i++) {
        edit_btn[i].onclick = function(){
            var cnf = window.confirm("Do you update it?");
            if(cnf == true){
                var edit_parent = this.parentElement;
                var col_parent = edit_parent.parentElement;
                var h5_data = col_parent.firstChild.childNodes[0].innerHTML;
                var h5_price = col_parent.firstChild.childNodes[1].innerHTML;
                title.value = h5_data;
                cost.value = h5_price;
                title.focus();
                product_btn.innerHTML = "update your data";
                product_btn.onclick = function(){
                    localStorage.removeItem("budget_"+h5_data);
                    var p_title = title.value;
                    var p_cost = cost.value;
                    var data = {p_cost : p_cost , p_title : p_title};
                    var string = JSON.stringify(data);
                    localStorage.setItem("budget_" + title.value,string);
                    location.reload();
                }
            }
            else{
                alert("Your data is safe!");
            }
        }
    }
}
all_data();