//Flaga isRun zapobiega ponownemy wywołania fukcji writePassword
var isRun = false;
//ilość nieudanych prób odgadnięcia czy dana litera jest w haśle
var numberOfWrongAttempts = 0;
//keklracja hasła oraz domyślna wartość

var randomPasswords = ["Bez kitu", "Bez poracy nie ma kołaczy", "Jaki ojciec taki syn", "Być albo nie być", "Małe jest piękne"];
var index = Math.floor(Math.random() * 5);
var password = randomPasswords[index];
//hiddenPassword odpowiada dokładej długości hasła ale składa się tylko z znaku "-"
var hiddenPassword = "";
password = password.toUpperCase();

	//Tablica polskich litter
	var characters = ["A", "Ą", "B", "C", "Ć", "D", "E", "Ę", "F", "G",
					"H", "I", "J", "K", "L", "Ł", "M", "N", "Ń", "O",
					"Ó", "P", "Q", "R", "S", "Ś", "T", "U", "V", "W",
					"X", "Y", "Z", "Ż", "Ź"];

//Funkcja odpowiada za wprowadzenie nowegohasła do odgadnięcia!					
function setMotto() {	
	isRun = false;
	
	//Flaga isError sprawdza czy nowe hasło nie zawiera niedozwolonych znakóe, jeśli tak! -> kończy walidację
	var isError = false;
	hiddenPassword = "";
	var newMotto = document.getElementById("sentence").value;
	
	//Regex waliduje czy nowe hasło zawiera tylko litery i białe znaki
	var reg = /^[a-zA-Z\s]*$/;

	if(newMotto == "" && isError == false) 
	{
		alert("Motto can't be empty!")
		isError = true;
	}
	if(newMotto.length <= 2 && isError == false) 
	{
		alert("Motto must contain between 3 and 20 chars!")
		isError = true;
	}
	if(reg.test(newMotto) == true && isError == false) 
	{
		password = newMotto;
		password = password.toUpperCase();

		for(i=0; i<password.length; i++){
			if(password.charAt(i) != " "){
				hiddenPassword += "-";
			}if(password.charAt(i) == " "){
				hiddenPassword += " ";
			}
		}
		writePassword();
		alert("NEW MOTTO IS: \"" + password + "\"")
		isError = true;
	}
	if(reg.test(newMotto) == false && isError == false) {
		alert("Allowed are only letters!")
		isError = true;
	}
}

for(i=0; i<password.length; i++) {
	if(password.charAt(i) != " ") {
		hiddenPassword += "-";
	}if(password.charAt(i) == " ") {
		hiddenPassword += " ";
	}
}
//tutaj laduje się główny script
window.onload = writePassword;				

function writePassword() {
	
	document.getElementById("label").innerHTML = hiddenPassword;
	if(isRun == false){							//a tu jest flaga która nie powzala mi na przeladoewanie całej fukcji generującej menu kontroli - resetuje ustawienia z fun: "matchCharToPassword"	
		setControlMenu();
		isRun = true;
	}
}
//Funkcja setControlMenu generuje divy z polskimi literami
function setControlMenu(){
		
	var divContent = "";
	
	for(i=0; i<characters.length; i++){
		if((i+1)%7 == 0){
			divContent += '<div id="charButtonId_' + i + '" class="charButton" onclick="matchCharToPassword(' + i + ')">' + characters[i] + '</div>'; 
						+ '<div style="clear:both;"></div>';
		}else{
			divContent += '<div id="charButtonId_' + i + '" class="charButton" onclick="matchCharToPassword(' + i + ')">' + characters[i] + '</div>';
		}
		
	}
	
	//po ustawiniu divContent zawrtość jest przekazywana do wewnętrznego diva HTML o id="control_menu"
	document.getElementById("control_menu").innerHTML = divContent;
}
//Funkcja matchkCharToPassword sprawdza czy znak przekazany po kliknęciu diva wygenerownaego
//przez funkcję setControlMenu znajduję się w ustawionym haśle do odgadnięcia!
function matchCharToPassword(number){
	
	//czy literaz znajduje się w szukanym haśle!
	var isFoundCharacter = false;																			
	
	for(i=0; i<characters.length; i++){
		if(password.charAt(i) == characters[number]){
			hiddenPassword = hiddenPassword.replaceAt1(i, characters[number]);
			isFoundCharacter = true;
		}
	}
	writePassword();
	
	//Pobieram identifikator przycisku
	var charButtonId = "charButtonId_" + number;	
	
	//ustawiam właściwości wciśniętego przyciska 
	if(isFoundCharacter == true){
		document.getElementById(charButtonId).style.background = "#005500";
		document.getElementById(charButtonId).style.border = "1.5px solid #00C000";
		document.getElementById(charButtonId).style.cursor = "default";
		document.getElementById(charButtonId).style.pointerEvents = "none";
	}else{
		document.getElementById(charButtonId).style.background = "#440000";
		document.getElementById(charButtonId).style.color = "#C00000";
		document.getElementById(charButtonId).style.border = "1.5px solid #C55000";
		document.getElementById(charButtonId).style.cursor = "default";	
		document.getElementById(charButtonId).style.pointerEvents = "none";
		document.getElementById(charButtonId).setAttribute("onclick",";");
		
		//Błedne próby odgadnięcia hasła
		numberOfWrongAttempts++;
		document.getElementById("hanger").innerHTML = '<img src="img/s' + numberOfWrongAttempts + '.jpg" alt="pic 01">';
	}
	//Obsługa zadarzenia gdy gracz odgadnie hasło
	if(hiddenPassword == password){											
	document.getElementById("control_menu").innerHTML = '<h4 style="text-align: center;">CONGRATULATIONS YOU WON!</h4>' 
												+ '<div class="reset" onclick="location.reload()">TRY AGAIN</div>';
	}
	//Obsługa zadarzenia gdy gracz nie odgadnie hasła
	if(numberOfWrongAttempts == 9){
		document.getElementById("control_menu").innerHTML = '<h4 style="text-align: center;">YOU LOST!</h4>' 
												+ '<h4 style="text-align: center;">ANSWER: "' 
												+ password +'"</h4>' + '<div class="reset" onclick="location.reload()">TRY AGAIN</div>';

	}
	
}

//Wercja charAt według M. Zalenta
String.prototype.replaceAt1 = function(nrOfTarget, replacement){
	if(nrOfTarget > this.length-1){
		return thid.toString();
	}else{
		return this.substr(0,nrOfTarget) + replacement + this.substr(nrOfTarget+1);
	}
}

//Moja własna wersja funkcji charAt bez użycia wubdowanych funkcji - zle działa dla danego przypadku!!!
String.prototype.replaceAt = function(nrOfTarget, replacement){
	if(nrOfTarget <= this.length){
		var str = [];
		var string;
		for(i=0; i<this.length; i++){
			str[i] = this.charAt(i);
		}
		str[nrOfTarget] = replacement;
	}
	
	string = str.toString();
	string = string.replace(/,/g, "");

	return string;
}


