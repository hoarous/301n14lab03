"use strict";

function Animal(animal) {
  this.image_url = animal.image_url;
  this.title = animal.title;
  this.description = animal.description;
  this.keyword = animal.keyword;
  this.horns = animal.horns;
  this.page='pg' + currentPage;
}

//create animals array
Animal.allAnimals = [[],[]];
Animal.animalTypes = [];
let currentPage = 1;

Animal.prototype.toHTML = function(){
  let template = $('#photo-template').html();
  let templateRender = Handlebars.compile(template);
  return templateRender(this);
}

Animal.options = function() {
    let list = this.animalTypes;
    let template = $('#keyword-template').html();
    let templateRender = Handlebars.compile(template);
  
    Animal.allAnimals[currentPage-1].forEach(el => {
      if ($.inArray(el.keyword, list) === -1) {
        list.push(el.keyword);
        $('#sel').append(templateRender(el));
      }
    });
  };


// OLD CODE: non-handlebars

//render photos to DOM
// Animal.prototype.render = function() {
//   $("main").append('<div class="clone"></div>');
//   let animalClone = $('div[class="clone"]');

//   let animalHtml = $("#photo-template").html();

//   animalClone.html(animalHtml);

//   animalClone.find("h2").text(this.title);
//   animalClone
//     .find("img")
//     .attr("src", this.image_url)
//     .attr("alt", this.keyword);
//   animalClone.find("p").text(this.description);
//   animalClone.removeClass("clone");
//   animalClone.attr("class", this.keyword + " animals");
// };

// //set keyword filters; used stack overflow to remove duplicates
// Animal.options = function() {
//   let list = this.animalTypes;

//   Animal.allAnimals.forEach(el => {
//     if ($.inArray(el.keyword, list) === -1) {
//       list.push(el.keyword);
//     }
//   });

//   list.forEach(keyword => {
//     let options = $('<option class="option"></option>');
//     options.text(keyword);
//     $("#sel").append(options);
//   });
// };

$('select[name="animalChoices"]').on("change", function() {
  let $selection = $(this).val();
  console.log($selection);
  $(".animals").hide();
  $("." + $selection).show();
});

//read JSON data
Animal.readJson = () => {
  let sourcedata;
  if(currentPage===1){
    sourcedata = 'data/page-1.json';
  } else {
    sourcedata = 'data/page-2.json';
  }
  $.get(sourcedata, "json")
    .then(data => {
      data.forEach(item => {
        Animal.allAnimals[currentPage-1].push(new Animal(item));
      });
    })

    .then(Animal.loadAnimals);
};

Animal.loadAnimals = () => {
  let page;
  if(currentPage===1){
    page='#pg1';
  } else{
    page = '#pg2';
  }
  Animal.allAnimals[currentPage-1].forEach(animal => $(page).append(animal.toHTML()));
  Animal.options();
};

const loadPage = (pg) =>{
  currentPage = pg;
  if(pg===1){
    $('#pg2').hide();
    $('#pg1').show();
  } else if($('#pg2').children().length>0){
    $('#pg1').hide();
    $('#pg2').show();
  } else{
    $(() => Animal.readJson());
    $('#pg1').hide();
  }
}

$(() => Animal.readJson());
