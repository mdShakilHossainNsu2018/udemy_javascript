// console.log("started");
// let getIdes = new Promise((resolve, reject)=>{
//    setTimeout(()=>{
//     resolve([150, 833, 499, 544])
//    },1500);
// });
//
// let getRecipe = recID => {
//     return new Promise((resolve, reject)=>{
//         setTimeout(ID => {
//                         const recipe = {title: 'Fresh tomato pasta', publisher: 'Jonas'};
//                         resolve(`${ID}: ${recipe.title}`);
//                     }, 1500, recID);
//     });
// };
//
// const getRelated = publisher => {
//     return new Promise((resolve, reject) => {
//         setTimeout(pub => {
//             const recipe = {title: 'Italian Pizza', publisher: 'Jonas'};
//             resolve(`${pub}: ${recipe.title}`);
//         }, 1500, publisher);
//     });
// };
//
//
// // getIdes
// //     .then(ids=>{
// //     console.log(ids);
// //         return getRecipe(ids[2]);
// // })
// //     .then(recipe => {
// //         console.log(recipe);
// //         return getRelated('Jonas Schmedtmann');
// //     })
// //     .then(recipe => {
// //         console.log(recipe);
// //     })
// //     .catch(e=>{
// //         console.log(e);
// //     });
//
// async function getRecepiesAW() {
//     let Ids = await getIdes;
//     console.log(Ids);
//     let recipes = await getRecipe(Ids[2]);
//     console.log(recipes);
//     let releted = await getRelated("Shakil");
//     console.log(releted);
//
//     return recipes;
// }
// getRecepiesAW().then(res => console.log(`${res} this is best.`));
//

function getWeather(woeid) {
    fetch(`https://crossorigin.me/https://www.metaweather.com/api/location/${woeid}/`)
        .then(result => {
            // console.log(result);
            return result.json();
        })
        .then(data => {
            // console.log(data);
            const today = data.consolidated_weather[0];
            console.log(`Temperatures today in ${data.title} stay between ${today.min_temp} and ${today.max_temp}.`);
        })
        .catch(error => console.log(error));
}
getWeather(2487956);
getWeather(44418);


async function getWeatherAW(woeid) {
    try {
        const result = await fetch(`https://crossorigin.me/https://www.metaweather.com/api/location/${woeid}/`);
        const data = await result.json();
        const tomorrow = data.consolidated_weather[1];
        console.log(`Temperatures tomorrow in ${data.title} stay between ${tomorrow.min_temp} and ${tomorrow.max_temp}.`);
        return data;
    } catch(error) {
        alert(error);
    }
}
getWeatherAW(2487956);

let dataLondon;
getWeatherAW(44418).then(data => {
    dataLondon = data
    console.log(dataLondon);
});

