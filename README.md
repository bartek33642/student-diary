
# Akademia Tarnowska

## Kurs

Testowanie i Jakość Oprogramowania / Projekt

## Autorzy

- Bartłomiej Cich [@bartek33642](https://www.github.com/bartek33642)
- Wiktor Markowicz [@wiktor34306](https://www.github.com/wiktor34306)

## Temat projektu
Student diary - Dzienniczek uczniowski

## Opis projektu

**Dzienniczek uczniowski** jest to aplikacja, która ma na celu ułatwienie uczniom zarządzania swoimi ocenami z przedmiotów, sprawdzania średnich - ważonej i arytemtycznej, przewidywania możliwej oceny końcowej. Oferuje również generowanie wykresów, obliczenia w kalkulatorze średniej ważonej, sprawdzenia procentowego udziału ocen ucznia ze wszystkich ocen cząstkowych.

##  Uruchomienie projektu

Sklonuj projekt

```bash
  git clone https://github.com/bartek33642/student-diary.git
```

Przejdź do folderu z projektem

```bash
  cd student-diary
```
Zainstaluj zależności

-  Po stronie serwera

```bash
  cd server
  npm install
```

-  Po stronie klienta

```bash
  cd ..
  cd client
  npm install
```

 Uruchom serwer

-  Po stronie serwera

```bash
  cd server
  npm start
```

-  Po stronie klienta
 - Uruchom w drugim terminalu

```bash
  cd client
  npm start
``` 


## Uruchomienie testów jenostkowych i integracyjnych
 - po stronie serwera 
 
```bash
  cd server
  npm test
```

-  Po stronie klienta 

```bash
  cd client
  npm test
```

## Dokumentacja API


### **Oceny**

#### Pobierz oceny z przedmiotu
- Adres usługi: ``` /grades/:subjectId ```,
- Typ: **GET**
- Parametry ścieżki: subjectID - ID przedmiotu,
- Zwraca: Lista ocen z danego przedmiotu.

#### Pobieranie wszystkich ocen
- Adres: `/grades/all`
- Typ: **GET**
- Zwraca: Lista wszystkich ocen

#### Dodawanie nowej oceny
- Adres: `/grades`
- Typ: **POST**
- Przyjmuje: JSON z danymi oceny
   ```json
   {
     "value": 4.5,
     "weight": 1,
     "comment": "Sprawdzian!",
     "subjectId": "5f8a1e2a4d7ea3b9a5dab9e3"
   }
  ```
- Zwraca: Stworzoną ocenę

#### Aktualizowanie oceny
- Adres: `/grades/:gradeId`
- Typ: **PUT**
- Parametry ścieżki: gradeId - ID oceny
- Przyjmuje: JSON z danymi oceny
   ```json
   {
     "value": 5.0,
     "weight": 2,
     "comment": "Sprawdzian!",
     "subjectId": "5f8a1e2a4d7ea3b9a5dab9e3"
   }
  ```
- Zwraca: Zaktualizowaną ocenę

#### Usuwanie oceny
- Adres: `/grades/:gradeId`
- Typ: **DELETE**
- Parametry ścieżki: gradeId - ID oceny
- Zwraca: Potwierdzenie usunięcia

#### Podliczenie wszystkich ocen
- Adres: `/count-of-all-grades`
- Typ: **GET**
- Zwraca: Liczbę wszystkich ocen


### **Oceny końcowe**

#### Wyświetlanie oceny końcowej
- Adres: `/finalGrades/:subjectId`
- Typ: **GET**
- Parametry ścieżki: subjectId - ID przedmiotu
- Zwraca: Lista ocen końcowych z danego przedmiotu

#### Dodawanie oceny końcowej
- Adres: `/finalGrades`
- Typ: **POST**
- Przyjmuje: JSON z danymi oceny końcowej
   ```json
   {
     "value": 4.0,
     "subjectId": "5f8a1e2a4d7ea3b9a5dab9e3"
   }
  ```
- Zwraca: Stworzoną ocenę końcową

#### Aktualizowanie oceny końcowej
- Adres: `/finalGrades/:finalGradeId`
- Typ: **PUT**
- Parametry ścieżki: finalGradeId  - ID oceny końcowej
- Przyjmuje: JSON z danymi do aktualizacji oceny końcowej
   ```json
   {
     "value": 5.0,
     "subjectId": "5f8a1e2a4d7ea3b9a5dab9e3"
   }
  ```
- Zwraca: Zaktualizowaną ocenę końcowę

#### Usuwanie oceny końcowej
- Adres: `/finalGrades/:finalGradeId`
- Typ: **DELETE**
- Parametry ścieżki: finalGradeId  - ID oceny końcowej
- Zwraca: Potwierdzenie usunięcia

#### Podliczenie wszystkich ocen końcowych
- Adres: `/count-of-final-grades`
- Typ: **GET**
- Zwraca: Liczbę wszystkich ocen końcowych

### **Przedmioty**

#### Pobranie wszystkich przedmiotów
- Adres: `/subjects`
- Typ: **GET**
- Zwraca: Lista wszystkich przedmiotów

#### Pobranie przedmiotów o określonym ID
- Adres: `/subjects/:id`
- Typ: **GET**
- Parametry ścieżki: id  - ID przedmiotu
- Zwraca: Nazwę przedmiotu o podanym ID

#### Dodawanie nowego przedmiotu
- Adres: `/subjects`
- Typ: **POST**
- Przyjmuje: JSON z nazwą nowego przedmiotu
   ```json
   {
     "name": "Matematyka",
   }
  ```
- Zwraca: Stworzony przedmiot

#### Aktualizowanie nazwy przedmiotu
- Adres: `/subjects/:id`
- Typ: **PUT**
- Parametry ścieżki: id  - ID przedmiotu
- Przyjmuje: JSON z danymi do aktualizacji przedmiotu
   ```json
   {
     "name": "Rozszerzona Matematyka"
   }
  ```
- Zwraca: Zaktualizowany przedmiot

#### Usuwanie przedmiotu
- Adres: `subjects/:id`
- Typ: **DELETE**
- Parametry ścieżki: id  - ID przedmiotu
- Zwraca: Potwierdzenie usunięcia przedmiotu

#### Podliczenie wszystkich ocen końcowych
- Adres: `/count-of-subjects`
- Typ: **GET**
- Zwraca: Liczbę wszystkich przedmiotów

### **Użytkownicy**

#### Pobranie wszystkich użytkowników
- Adres: `/user`
- Typ: **GET**
- Zwraca: Lista wszystkich użytkowników

#### Dodawanie nowego użytkownika
- Adres: `/add-user`
- Typ: **POST**
- Przyjmuje: JSON z danymi nowego użytkownika
   ```json
   {
    "first_name": "Jan",
    "second_name": "Kowalski",
    "birth_date": "2007-01-01"   
   }
  ```
- Zwraca: Stworzonego użytkownika

#### Aktualizowanie użytkownika
- Adres: `/user/:userId`
- Typ: **PUT**
- Parametry ścieżki: userId - ID użytkownika
- Przyjmuje: JSON z danymi do aktualizacji użytkownika
   ```json
   {
    "first_name": "Antoni",
    "second_name": "Nowak",
    "birth_date": "2007-03-01"   
   }
  ```
- Zwraca: Zaktualizowanego użytkownika

#### Usuwanie użytkownika
- Adres: `/user/:userId`
- Typ: **DELETE**
- Parametry ścieżki: userId   - ID użytkownika
- Zwraca: Potwierdzenie usunięcia użytkownika


## Scenariusze testowe dla testera manualnego
| Test Case ID |  Opis  |	Kroki testowe	| Oczekiwany wynik|
|:-----|:--------:|:------:|:------: |
| TC_01   | Scenariusz dodawania nowego przedmiotu i sprawdzenia czy jest on poprawnie wyświetlany na liście przedmiotów | 1.	Naciśnij przycisk „Dodaj przedmioty” 2.	Wpisz nazwę przedmiotu, w otwierającym się oknie modalnym 3.	Kliknij przycisk „Zapisz”  4.	Naciśnij przycisk „Hamburgera” znajdujący się w lewym górnym rogu aplikacji  5.	Wybierz zakładkę „Przedmioty” |  Wyświetlony napis na zielonym tle z potwierdzeniem powodzenia akcji oraz poprawnie dodany przedmiot do tabeli znajdującej się w zakładce „Przedmioty”  |
| TC_02   |  Scenariusz dodawania oceny do przedmiotu i sprawdzenia, czy średnia arytmetyczna i ważona są poprawnie obliczane oraz aktualizowane  |   1.	Naciśnij przycisk „Hamburgera” znajdujący się w lewym górnym rogu aplikacji  2.	Kliknij w zakładkę „Oceny” 3.	Kliknij „+” w kolumnie „Oceny”, przy nazwie przedmiotu z kolumny „Przedmiot” 4.	Wpisz w wyskakujące okna Wartość, Wagę, Komentarz dla oceny. Zatwierdzaj dane przyciskiem „OK” 5.	Sprawdzenie czy w kolumnach „Średnia arytmetyczna” i Średnia ważona” są poprawne wartości wyświetlane w odpowiednich kolumnach | Ocena zostaje dodana do tabeli i wyświetlana jest w kolumnie „Oceny” przed przyciskiem ze znakiem „+” |
| TC_03   |  Scenariusz usunięcia oceny i sprawdzenia, czy średnia arytmetyczna i ważona są poprawnie obliczane oraz aktualizowane  |   1.	Naciśnij przycisk „Hamburgera” znajdujący się w lewym górnym rogu aplikacji 2.	Kliknij w zakładkę „Oceny” 3.	Kliknij w ocenę, którą chcesz usunąć 4.	W otwartym oknie modalnym, wybierz przycisk „Usuń ocenę” 5.	Potwierdź swoją decyzję i naciśnij przycisk „OK” 6.	Sprawdź czy wybrana ocena została usunięta 7.	Sprawdź, czy średnie zostały zaktualizowane  | Ocena znika z tabeli oraz średnie ulegają zmianie |
| TC_04   |  Scenariusz edycji oceny i sprawdzenia, czy wartości poprawnie się zmieniły oraz, czy średnia arytmetyczna i ważona są poprawnie zaktualizowane  |   1.	Naciśnij przycisk „Hamburgera” znajdujący się w lewym górnym rogu aplikacji 2.	Kliknij w zakładkę „Oceny” 3.	Kliknij w ocenę, którą chcesz zmienić 4.	W otwartym oknie modalnym, wybierz przycisk „Edytuj ocenę” 5.	Wprowadź nowe wartości – Ocena, Waga, Komentarz 6.	Kliknij przycisk „OK” 7.	Sprawdź czy ocena została zmieniona 8.	Sprawdź czy średnie zostały zaktualizowane   | Wartość, waga, komentarz oceny  ulegają zmianie oraz średnie zostają zaktualizowane |
| TC_05   |  Scenariusz zmiany nazwy przedmiotu i sprawdzenia czy zmiana jest widoczna we wszystkich miejscach, gdzie nazwa przedmiotu jest wyświetlana  |   1.	Naciśnij przycisk „Hamburgera” znajdujący się w lewym górnym rogu aplikacji 2.	Kliknij w zakładkę „Przedmioty” 3.	Wybierz przycisk „Zmień nazwę” przy nazwie przedmiotu, którą chcesz zmienić 4.	W oknie podaj nową nazwę przedmiotu 5.	Kliknij przycisk „OK” 6.	Sprawdź czy nazwa się zmieniła 7.	Przejdź do zakładki „Oceny” 8.	Sprawdź nazwę przedmiotu, czy została poprawnie zmieniona  | Nazwa przedmiotu została zaktualizowana |
| TC_06   |  Scenariusz usunięcia przedmiotu bez ocen i sprawdzenia, czy przedmiot jest poprawnie usunięty z listy  |   1.	Naciśnij przycisk „Hamburgera” znajdujący się w lewym górnym rogu aplikacji 2.	Kliknij w zakładkę „Oceny” 3.	Sprawdź, czy przy nazwie przedmiotu, który ma zostać usunięty nie są dodane oceny. Jeśli są, usuń wszystkie oceny dla tego przedmiotu 4.	Przejdź do zakładki „Przedmioty” 5.	Kliknij przycisk „Usuń” 6.	Potwierdź chęć wykonania operacji w wyskakującym oknie naciśnij przycisk „OK” 7.	Sprawdź czy wiersz z nazwą przedmiotu w tabelce został usunięty 8.	Przejdź do zakładki „Oceny” 9.	Zobacz, czy wiersz z wybranym przedmiotem został usunięty  | Nazwa przedmiotu znika z tabel w zakładkach „Przedmioty” oraz „Oceny” |
| TC_07   |  Scenariusz wyświetlenia przewidywanej oceny końcowej oraz sprawdzenia poprawności wyświetlania zgodnego z założeniami  |   1.	Naciśnij przycisk „Hamburgera” znajdujący się w lewym górnym rogu aplikacji 2.	Kliknij w zakładkę „Oceny” 3.	Sprawdź, czy dany przedmiot posiada ocenę/oceny. Jeśli nie, to przewidywana ocena się nie wyświetli 4.	Sprawdź, czy przewidywana ocena jest poprawnie wyświetlana w kolumnie „Przewidywana ocena końcowa” 5.	Jeśli średnia ważona wynosi X.51 lub więcej to wykonuje się założenie, że X+1 jeśli X.50 lub mniej to wychodzi X przewidywane  | Poprawnie wyświetla się ocena przewidywana w kolumnie „Przewidywana ocena końcowa” dla danego przedmiotu |
| TC_08   |  Scenariusz dodania rzeczywistej (właściwej) oceny końcowej oraz sprawdzenia czy jest poprawnie wyświetlana  |  1.	Naciśnij przycisk „Hamburgera” znajdujący się w lewym górnym rogu aplikacji 2.	Kliknij w zakładkę „Oceny” 3.	Sprawdź, czy dany przedmiot posiada ocenę/oceny. Jeśli nie, to nie doda się ocena końcowa 4.	Kliknij w przycisk ze znakiem „+” w kolumnie „Ocena końcowa” przy wybranym przedmiocie 5.	Wpisz wartość oceny końcowej w wyskakującym oknie 6.	Naciśnij przycisk „OK” 7.	Sprawdź czy końcowa ocena się poprawnie dodała   | Ocena końcowa zostaje poprawnie dodana w kolumnie „Ocena końcowa” dla konkretnego przedmiotu |
| TC_09   |  Scenariusz sprawdzenia wykorzystania oceny końcowej przy obliczeniu średniej całorocznej  |  1.	Naciśnij przycisk „Hamburgera” znajdujący się w lewym górnym rogu aplikacji 2.	Kliknij w zakładkę „Oceny” 3.	Sprawdź, czy w tabeli z ocenami, są wpisane jakieś oceny końcowe. Jeżeli tak, to średnia będzie liczona. Jeśli nie ma żadnych ocen końcowych, średnia wynosi 0. Jeżeli nie ma ocen końcowych, dodaj je 4.	Zjedź pod tabelę z ocenami i popatrz, czy „Twoja średnia z całego roku”, zmienia się, w zależności od ilości i wartości wpisywanych ocen końcowych  | Średnia całoroczna ulega zmianie, w zależności od ilości i wartości ocen końcowych |
| TC_10   |  Scenariusz usunięcia rzeczywistej oceny końcowej oraz sprawdzenia, czy jest ona poprawnie usunięta i czy nie jest uwzględniana w obliczeniach  |  1.	Naciśnij przycisk „Hamburgera” znajdujący się w lewym górnym rogu aplikacji 2.	Kliknij w zakładkę „Oceny” 3.	Sprawdź obecną średnią z całego roku, znajdującą się pod tabelką z ocenami 4.	Kliknij w ocenę końcową z wybranego przedmiotu 5.	W wyskakującym oknie, potwierdź operację, klikając przycisk „OK” 6.	Sprawdź, czy ocena zniknęła oraz czy średnia uległa zmianie  | Ocena zostaje usunięta z kolumny z ocenami końcowymi. Nie wlicza się do średniej całorocznej |
| TC_11   |  Scenariusz dodania oceny i wagi w kalkulatorze średniej ważonej i sprawdzenia czy średnia ważona jest poprawnie obliczana  |  1.	Naciśnij przycisk „Hamburgera” znajdujący się w lewym górnym rogu aplikacji 2.	Kliknij w zakładkę „Oceny” 3.	Zjedź na dół i wprowadź wartość oraz wagę oceny 4.	Możesz dodać kolejną ocenę, kliknij w przycisk „Dodaj nowy wiersz” 5.	Wprowadź kolejną wartość i wagę 6.	Naciśnij przycisk „Oblicz” i zobacz, czy średnia się obliczyła 7.	Sprawdź, czy wartość średniej jest obliczona poprawnie  | Dodawanie wartości oceny i wagi do kalkulatora jest możliwe. Średnia ważona poprawnie się wyświetla |
| TC_12   |  Scenariusz dodania oceny do przedmiotu i sprawdzenia, czy mediana i dominanta są poprawnie obliczane oraz aktualizowane  |  1.	Naciśnij przycisk „Hamburgera” znajdujący się w lewym górnym rogu aplikacji 2.	Kliknij w zakładkę „Oceny” 3.	Kliknij „+” w kolumnie „Oceny”, przy nazwie przedmiotu z kolumny „Przedmiot” 4.	Wpisz w wyskakujące okna Wartość, Wagę, Komentarz dla oceny. Zatwierdzaj dane przyciskiem „OK” 5.	Sprawdzenie, czy w kolumnach „Mediana” i „Dominanta” są poprawne wartości wyświetlane w odpowiednich kolumnach 6.	W przypadku, gdy nie ma kilku ocen o tej samej wartości z wybranego przedmiotu, nie ma dominanty i komunikat „Brak dominanty – dane występują tyle samo razy” pojawia się w tabeli  | Mediana i dominanta wyświetlają się poprawnie. Mediana zawsze, dominanta tylko gdy z danego przedmiotu wartości ocen się powtarzają |
| TC_13   |  Scenariusz usunięcia oceny z przedmiotu i sprawdzenia, czy mediana i dominanta są poprawnie obliczane oraz aktualizowane  | 1.	Naciśnij przycisk „Hamburgera” znajdujący się w lewym górnym rogu aplikacji 2.	Kliknij w zakładkę „Oceny” 3.	Kliknij w ocenę z danego przedmiotu, którą chcesz usunąć 4.	W otwartym oknie modalnym wybierz przycisk „Usuń ocenę” 5.	Potwierdź tę operację, klikając przycisk „OK” 6.	Zobacz, czy mediana i dominanta się zaktualizowały  | Mediana i dominanta zostają zaktualizowane po usunięciu oceny z wybranego przedmiotu |
| TC_14   |  Scenariusz dodania oceny do przedmiotu i sprawdzenia, czy kolor przycisku dla tej oceny jest poprawnie wyświetlany  | 1.	Naciśnij przycisk „Hamburgera” znajdujący się w lewym górnym rogu aplikacji 2.	Kliknij w zakładkę „Oceny” 3.	Kliknij przycisk „+” w kolumnie „Oceny” przy nazwie wybranego przedmiotu. 4.	Podaj wszystkie wymagane własności: wartość, waga i komentarz. 5.	Sprawdź, czy tła przycisków poprawnie się wyświetlają, jeżeli wpisałeś ocenę równą:    1 lub 1.5 – wyświetla się ocena na bordowym tle;   2 lub 2.5 – wyświetla się ocena na pistacjowym (szarozielonym) tle; 3 lub 3.5 - wyświetla się ocena na pomarańczowym tle; 4 lub 4.5 - wyświetla się ocena na purpurowym tle; 5 lub 5.5 - wyświetla się ocena na granatowym tle; 6 - wyświetla się ocena na zielonym tle; Mniejszą od 1 lub większą od 6 - wyświetla się ocena na ciemnoszarym tle;  | Tło przycisków z ocenami wyświetla się poprawnie |
| TC_15   |  Scenariusz sprawdzenia poprawności wyświetlania odpowiedzi, czy wychodzi świadectwo z paskiem na podstawie średniej całorocznej oraz czy te dane są aktualizowane (po usunięciu oceny końcowej)  | 1.	Naciśnij przycisk „Hamburgera” znajdujący się w lewym górnym rogu aplikacji 2.	Kliknij w zakładkę „Oceny” 3.	Sprawdź, czy są dodane oceny oraz oceny końcoworoczne. Jeśli nie, to je dodaj 4.	Sprawdź, czy przy napisie „Świadectwo z paskiem: ”, wyświetla się poprawny napis (Tak lub Nie) 5.	Zweryfikuj to ze średnią z całego roku: jeżeli średnia jest wyższa bądź równa 4.75, pojawia się napis „Tak”. Jeżeli średnia jest mniejsza, to pojawia się napis „Nie”  | Informacja, czy z ocen końcowych wychodzi świadectwo z paskiem, jest zgodna z rzeczywistością |
| TC_16   |  Scenariusz sprawdzenia poprawności danych przy dodawaniu oceny, wagi oraz tematu do oceny z przedmiotu oraz aktualizowaniu danych  | 1.	Naciśnij przycisk „Hamburgera” znajdujący się w lewym górnym rogu aplikacji 2.	Kliknij w zakładkę „Oceny” 3.	Dodaj ocenę, zwracając uwagę na wpisywane własności oceny 4.	Najedź na nowododaną ocenę i odczytaj, czy wyświetlona ocena, waga, komentarz są zgodne z wpisywanymi  | Własności oceny wyświetlają się poprawnie, po najechaniu na nią|
| TC_17   |  Scenariusz sprawdzenia, jeśli dla danego przedmiotu nie są dodane oceny, to w kolumnach średnich, mediany, dominanty, przewidywanej oceny nie wyświetlają się dane lub są puste pola  | 1.	Naciśnij przycisk „Hamburgera” znajdujący się w lewym górnym rogu aplikacji 2.	Kliknij w zakładkę „Oceny” 3.	Sprawdź, czy w tabeli występuje jakiś przedmiot bez ocen. Jeśli nie, to usuń istniejące oceny z wybranego przedmiotu, bądź dodaj nowy przedmiot 4.	Sprawdź, czy w kolumnach „Średnia arytmetyczna”, „Średnia ważona”, „Mediana”, „Dominanta”, „Przewidywana ocena końcowa” dla przedmiotu, który nie ma ocen, nie wyświetlają się dane lub wartość jest równa 0 | Dla konkretnego przedmiotu, który nie ma ocen, nie wyświetlają się dane lub jego wartość jest równa 0 |
| TC_18   |  Scenariusz usunięcia wiersza w kalkulatorze liczącym średnią ważoną  | 1.	Naciśnij przycisk „Hamburgera” znajdujący się w lewym górnym rogu aplikacji 2.	Kliknij w zakładkę „Oceny” 3.	Zjedź pod tabelę z ocenami, informacjami o średniej z całego roku, procentowym udziale wybranej oceny w zbiorze oraz przycisk odpowiadający za wyświetlenie wykresów 4.	Wprowadź wartości w polach „Wartość” i „Waga” 5.	Usuń wiersz, naciskając przycisk „X” 6.	Sprawdź, czy wiersz został poprawnie usunięty | Poprawnie usunięty wiersz z „Wartością” i „Wagą” w kalkulatorze liczącym średnią |
| TC_19   |  Scenariusz sprawdzenia poprawności sortowania nazw przedmiotów w kolejności alfabetycznej w zakładce „Przedmioty”  |1.	Naciśnij przycisk „Hamburgera” znajdujący się w lewym górnym rogu aplikacji 2.	Kliknij w zakładkę „Przedmioty” 3.	Sprawdź, czy nazwy przedmiotów wyświetlają się w kolejności alfabetycznej  | Nazwy przedmiotów w zakładce „Przedmioty” wyświetlają się w kolejności alfabetycznej |
| TC_20   |  Scenariusz dodania danych użytkownika i sprawdzenie, czy imię użytkownika wyświetla się poprawnie na stronie głównej aplikacji  |1.	Naciśnij przycisk „Podaj swoje dane” 2.	Wprowadź dane – „Imię”, „Nazwisko”, „Data urodzenia” i zatwierdź wprowadzone dane, klikając przycisk „Zapisz” 3.	Sprawdź, czy imię poprawnie wyświetla się na stronie głównej. Imię powinno być widoczne w napisie „Witaj ‘Imię’, w Twoim prywatnym uczniowskim dzienniczku”   | Na stronie głównej po podaniu danych osobowych: „Imię”, „Nazwisko”, „Data urodzenia”, imię wyświetla się w tekście |
| TC_21   |  Scenariusz sprawdzenia poprawności wyświetlania danych osobowych użytkownika, w zakładce „Ustawienia” –> „O użytkowniku”  |1.	Naciśnij przycisk „Hamburgera” znajdujący się w lewym górnym rogu aplikacji 2.	Kliknij w zakładkę „Ustawienia” 3.	Sprawdź, czy w sekcji „O użytkowniku”, zgadzają się dane osobowe, wprowadzone wcześniej do aplikacji  | Dane osobowe użytkownika poprawnie wyświetlają się w zakładce „Ustawienia” |
| TC_22   |  Scenariusz modyfikacji danych osobowych użytkownika  |1.	Naciśnij przycisk „Hamburgera” znajdujący się w lewym górnym rogu aplikacji 2.	Kliknij w zakładkę „Ustawienia” 3.	W sekcji „O użytkowniku”, kliknij przycisk „Edytuj dane użytkownika” 4.	W pojawiających się polach („Imię”, „Nazwisko”, „Data urodzenia”), zweryfikuj dane i popraw wybrane dane 5.	Po wprowadzeniu zmian, zatwierdź zmiany, klikając w przycisk „Zapisz zmiany”  | Modyfikacja danych osobowych się powiodła i  zmienione dane użytkownika wyświetlają się w aplikacji |
| TC_23   |  Scenariusz usunięcia danych użytkownika   |1.	Naciśnij przycisk „Hamburgera” znajdujący się w lewym górnym rogu aplikacji 2.	Kliknij w zakładkę „Ustawienia” 3.	W sekcji „O użytkowniku”, kliknij przycisk „Usuń użytkownika” 4.	Po pomyślnym usunięciu danych, we wspomnianej sekcji wyświetla się tekst „Brak danych w bazie”   | Dane użytkownika zostają poprawnie usunięte |


## Technologie użyte w projekcie
- Node.js
- Express.js
- React.js
- HTML
- CSS
- JavaScript
- Jest.js

