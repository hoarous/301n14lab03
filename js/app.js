"use strict";

function Animal(animal) {
  this.image_url = animal.image_url;
  this.title = animal.title;
  this.description = animal.description;
  this.keyword = animal.keyword;
  this.horns = animal.horns;
}

//create animals array
const allAnimals1 = [];
const allAnimals2 = [];
const animalTypes1 = [];
const animalTypes2 = [];

Animal.prototype.toHTML = function(){
  let template = $('#photo-template').html();
  let templateRender = Handlebars.compile(template);
  return templateRender(this);
}

Animal.options = function(pg) {
  let animalArray;
  let list;
  if(pg===1){
    animalArray = allAnimals1;
    list = animalTypes1;
  } else {
    animalArray = allAnimals2;
    list = animalTypes2;
  }
    let template = $('#keyword-template').html();
    let templateRender = Handlebars.compile(template);
  
    animalArray.forEach(el => {
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

// $('select[name="animalChoices"]').on("change", function() {
//   let $selection = $(this).val();
//   console.log($selection);
//   $(".animals").hide();
//   $("." + $selection).show();
// });

//read JSON data
Animal.readJson = (pg) => {
  let sourcefile;
  let animalArray;
  if(pg===1){
    sourcefile='data/page-1.json';
    animalArray = allAnimals1;
  }else{
    sourcefile='data/page-2.json';
    animalArray = allAnimals2;
  }
  $.get(sourcefile, "json")
    .then(data => {
      data.forEach(item => {
        animalArray.push(new Animal(item));
      });
    })

    .then(Animal.loadAnimals(pg));
};

Animal.loadAnimals = (pg) => {
  let page;
  let animalArray;
  if(pg===1){
    page='#page1';
    animalArray = allAnimals1;
  }else{
    page='#page2';
    animalArray = allAnimals2;
  }
  
  animalArray.forEach((animal) => $(page).append(animal.toHTML()));
  Animal.options();
};

$(() => Animal.readJson(1));

const showPageOne = () => {
$('.pg2').hide();
$('.pg1').show();
}
const showPageTwo = () =>{
  if(!$('#page2').children().length){
    $(() => Animal.readJson(2));
  };
  $('.pg1').hide();
  $('.pg2').show();
}
