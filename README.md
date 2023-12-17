
# Student diary - Dzienniczek uczniowski

🇺🇸 Web application developed for a project on software testing and quality

🇵🇱 Aplikacja internetowa stworzona na potrzeby projektu z testowania i jakości oprogramowania

## Run Locally - Uruchom program lokalnie

Clone the project - Sklonuj projekt

```bash
  git clone https://github.com/bartek33642/student-diary.git
```

Go to the project directory - Przejdź do folderu z projektem

```bash
  cd student-diary
```
Install dependencies - Zainstaluj zależności

- Server-side - Po stronie serwera

```bash
  cd server
  npm install
```

- Client-side - Po stronie klietna

```bash
  cd ..
  cd client
  npm install
```

Start the server - Uruchom serwer

- Server-side - Po stronie serwera

```bash
  cd server
  npm start
```

- Client-side - Po stronie klietna
Run in the second terminal/cmd - Uruchom w drugim terminalu

```bash
  cd client
  npm start
``` 
## Scenariusze testowe dla testera manualnego
| Test Case ID |  Opis  |	Kroki testowe	 | Oczekiwany wynik |
|:-----|:--------:|------:| ------: |
| TC_01   | Scenariusz dodawania nowego przedmiotu i sprawdzenia czy jest on poprawnie wyświetlany na liście przedmiotów | 1.	Naciśnij przycisk „Dodaj przedmioty” 
2.	Wpisz nazwę przedmiotu, w otwierającym się oknie modalnym 
3.	Kliknij przycisk „Zapisz”  
4.	Naciśnij przycisk „Hamburgera” znajdujący się w lewym górnym rogu aplikacji  
5.	Wybierz zakładkę „Przedmioty” |  Wyświetlony napis na zielonym tle z potwierdzeniem powodzenia akcji oraz poprawnie dodany przedmiot do tabeli znajdującej się w zakładce „Przedmioty”  |
| TC_02   |  Scenariusz dodawania oceny do przedmiotu i sprawdzenia, czy średnia arytmetyczna i ważona są poprawnie obliczane oraz aktualizowane  |   1.	Naciśnij przycisk „Hamburgera” znajdujący się w lewym górnym rogu aplikacji  
2.	Kliknij w zakładkę „Oceny” 
3.	Kliknij „+” w kolumnie „Oceny”, przy nazwie przedmiotu z kolumny „Przedmiot” 
4.	Wpisz w wyskakujące okna Wartość, Wagę, Komentarz dla oceny. Zatwierdzaj dane przyciskiem „OK” 
5.	Sprawdzenie czy w kolumnach „Średnia arytmetyczna” i Średnia ważona” są poprawne wartości wyświetlane w odpowiednich kolumnach
 | Ocena zostaje dodana do tabeli i wyświetlana jest w kolumnie „Oceny” przed przyciskiem ze znakiem „+” |

## Authors - Autorzy

- [@wiktor34306](https://www.github.com/wiktor34306)
- [@bartek33642](https://www.github.com/bartek33642)



