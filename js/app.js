"use strict";

function Animal(animal) {
  this.image_url = animal.image_url;
  this.title = animal.title;
  this.description = animal.description;
  this.keyword = animal.keyword;
  this.horns = animal.horns;
}

//create animals array
Animal.allAnimals = [];
Animal.animalTypes = [];

Animal.prototype.toHTML = function(){
  let template = $('#photo-template').html();
  let templateRender = Handlebars.compile(template);
  return templateRender(this);
}


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
Animal.options = function() {
  let list = this.animalTypes;

  Animal.allAnimals.forEach(el => {
    if ($.inArray(el.keyword, list) === -1) {
      list.push(el.keyword);
    }
  });

  list.forEach(keyword => {
    let options = $('<option class="option"></option>');
    options.text(keyword);
    $("#sel").append(options);
  });
};

// $('select[name="animalChoices"]').on("change", function() {
//   let $selection = $(this).val();
//   console.log($selection);
//   $(".animals").hide();
//   $("." + $selection).show();
// });

//read JSON data
Animal.readJson = () => {
  $.get("data/page-1.json", "json")
    .then(data => {
      data.forEach(item => {
        Animal.allAnimals.push(new Animal(item));
      });
    })

    .then(Animal.loadAnimals);
};

Animal.loadAnimals = () => {
  Animal.allAnimals.forEach(animal => $('#pg1').append(animal.toHTML()));
  Animal.options();
};

$(() => Animal.readJson());
