
# Metrics
### Funkcjonalności:

- Express.js
- Prosta autoryzacja (najlepiej bez pomocy 3rd libów)
- Baza danych MongoDB
- Zaprojektowanie struktury gromadzonych metryk
- Dane powinny być przypisane do konkretnego "użytkownika/organizacji" względem zaprojektowanej autoryzacji
- Filtr przedziału czasu do wyświetlenia danych
- Filtr "kategorii" do wyświetlenia danych (tj. jest kilka kategorii wyświetlania metryk)
- Grupowanie danych po godzinie/dniu/etc. (dimension)
- Podsumowanie wyświetlonych danych (summary) tj. min/max/avg
- Filtr przedziału czasu (period) eg. today/yesterday/thisMonth/lastMonth
- Walidacja przesłanych filtrów

## Getting started

Copy .env.template to .env. For test runs, you don't need to modify anything, but you will need MongoDB and Redis connection. You can use Docker to get them running on your machine:

```
docker run --rm -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=admin -p 27017:27017 mongo
```