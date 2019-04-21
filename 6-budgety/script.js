let budgetController = (function () {
    let Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    let Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };

    Expense.prototype.calcPercentage = function (totalIncome){

        if (totalIncome>0){
            this.percentage = Math.round((this.value / totalIncome)*100);
        } else {
            this.percentage = -1;
        }

    };

    Expense.prototype.getPercentances = function(){
      return this.percentage;
    };

    let calculateTotal = function(type){
    let sum=0;
    data.allItem[type].forEach(function (curr) {
        sum+=curr.value;
    });
        data.totals[type] = sum;
    };
    let data = {
        allItem: {
            exp:[],
            inc:[]
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1,
    };

    return {
        addItem: function (type, des, val) {
            let newItem, Id;
            
            if (data.allItem[type].length>0){
                Id = data.allItem[type][data.allItem[type].length-1].id+1;
            }else {
                Id = 0;
            }
            
            if (type === "exp"){
                newItem = new Expense(Id, des, val);
            } else {
                newItem = new Income(Id, des, val);
            }
            data.allItem[type].push(newItem);
            return newItem;
        },

        deleteItem: function(type, id){
            let ids, index;
            ids = data.allItem[type].map(function (current) {
                return current.id;
            });

            index = ids.indexOf(id);

            if (index !== -1){
                data.allItem[type].splice(index, 1);
            }
        },

        calculateBudget: function(){
        //calculate total
            calculateTotal('inc');
            calculateTotal('exp');

            // calculate expanse's
            data.budget = data.totals.inc - data.totals.exp;

            //calculate percent
            if (data.totals.inc>0){
                data.percentage = Math.round((data.totals.exp / data.totals.inc)*100);
            } else {
                data.percentage = -1;
            }
        },

        calculatePercentage: function(){
            data.allItem.exp.forEach(function (current) {
                current.calcPercentage(data.totals.inc);
            })
        },

        getPercentages: function(){
          let allParc = data.allItem.exp.map(function (current) {
              return current.getPercentances();
          });
          return allParc;
        },

        getBudget: function (){
          return {
              budget: data.budget,
              totalsInc: data.totals.inc,
              totalExp: data.totals.exp,
              percentage: data.percentage,
          }
        },

        testing: function () {
            console.log(data);
        }
        
    };

})();

let UIController = (function () {
    let DomString = {
        inputType: ".add__type",
        inputDescription: ".add__description",
        inputValue: ".add__value",
        btnAdd: ".add__btn",
        expensesContainer: ".expenses__list",
        incomeContainer: ".income__list",
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expensesPercLabel: '.item__percentage',
        dateLabel: '.budget__title--month'
    };

    let formatNumber = function (num, type) {
        let numSplit, int, dec;
        /*
            + or - before number
            exactly 2 decimal points
            comma separating the thousands

            2310.4567 -> + 2,310.46
            2000 -> + 2,000.00
            */

        num = Math.abs(num);
        num = num.toFixed(2);

        numSplit = num.split('.');

        int = numSplit[0];
        if (int.length > 3) {
            int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3); //input 23510, output 23,510
        }

        dec = numSplit[1];

        return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;

    };

    return {

      getDom: function () {
          return DomString;
      },

        displayMonth: function(){
            let now, months, month;
            now = new Date();

            months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            month = now.getMonth();

            year = now.getFullYear();
            document.querySelector(DomString.dateLabel).textContent = months[month] + ' ' + year;
        },

        displayPercentages: function(percentages){
          let fields = document.querySelectorAll(DomString.expensesPercLabel);

          let nodeListForEach = function (list, callback) {
              for (let i = 0; i<list.length ; i++){
                  callback(list[i], i);
              }
          };
          
          nodeListForEach(fields, function (current, index) {
              if (percentages[index]>0){
                  current.textContent = percentages[index] + "%";
              }else {
                  current.textContent = "--";
              }
          });

        },

        getInput: function () {
        return{
            type: document.querySelector(DomString.inputType).value,
            description: document.querySelector(DomString.inputDescription).value,
            value: parseFloat(document.querySelector(DomString.inputValue).value),
        }
        },

        addListItem: function (obj, type) {
            let html, newHtml, element;

            if (type ==='inc'){
                element = DomString.incomeContainer;

                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'exp') {
                element = DomString.expensesContainer;

                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
          newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));

            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },
        clearFields: function () {
            let fields, fieldsArray;
            fields = document.querySelectorAll(DomString.inputDescription+","+DomString.inputValue);
            fieldsArray = Array.prototype.slice.call(fields);
            fieldsArray.forEach(function (current, index, array) {
                current.value = "";
            });
            fieldsArray[0].focus();
        },

        displayBudget: function (obj) {
            document.querySelector(DomString.budgetLabel).textContent = obj.budget;
            document.querySelector(DomString.incomeLabel).textContent = obj.totalsInc;
            document.querySelector(DomString.expensesLabel).textContent = obj.totalExp;

            if(obj.percentage>0){
                document.querySelector(DomString.percentageLabel).textContent = obj.percentage + "%";
            } else {
                document.querySelector(DomString.percentageLabel).textContent = '--';
            }
        },

        deleteItemUi: function (itemId) {
            let el = document.getElementById(itemId);
            el.parentNode.removeChild(el);
        }

    };

})();


let controller = (function (budgetCtrl, UICtrl) {

    let setupEventListeners = function(){
        let DOM = UICtrl.getDom();

        document.querySelector(DOM.btnAdd).addEventListener('click', function () {
            ctrlAddItem();
        });
        document.addEventListener('keypress', function (event) {
            if (event.key==="Enter"){
                ctrlAddItem();
            }
        });
        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
    };

    let updateBudget = function (){
        //calculate
        budgetCtrl.calculateBudget();

        //return
        let budget = budgetController.getBudget();

        //
        UICtrl.displayBudget(budget);
    };

    let updatePercentage = function(){
        //calculate percentages
        budgetCtrl.calculatePercentage();

        //read percentages
        let percentages = budgetCtrl.getPercentages();

        //
        UICtrl.displayPercentages(percentages);
    };

    let ctrlAddItem = function(){
        let input, newItem;

        input = UICtrl.getInput();
        if (input.description!=="" && !isNaN(input.value) && input.value>0){

            newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            //add the item ui

            UICtrl.addListItem(newItem, input.type);

            //filed clear

            UICtrl.clearFields();

            //calculate and update budget
            updateBudget();

            //
            updatePercentage();

            //
            updateBudget();

        }
    };

    let ctrlDeleteItem = function (event) {
        let itemId, splitItem, id, type;
        itemId =  event.target.parentNode.parentNode.parentNode.parentNode.id;
        
        if (itemId){
            splitItem = itemId.split('-');
            type = splitItem[0];
            id = parseInt(splitItem[1]);
        }
        budgetCtrl.deleteItem(type, id);

        // delete item from Ui
        UICtrl.deleteItemUi(itemId);

        //update ui
        updateBudget();

        //
        updatePercentage();

        //
        updateBudget();
    };
  return {
      init:function () {
          setupEventListeners();
          UICtrl.displayMonth();
          UICtrl.displayBudget({
              budget: 0,
              totalsInc: 0,
              totalExp: 0,
              percentage: -1,
          })
      }
  }

})(budgetController, UIController);

controller.init();