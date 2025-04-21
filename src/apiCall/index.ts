export const fetchCapitalsData = async () => {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all");
    if (!response.ok) {
      throw new Error("Failed to fetch capitals data");
    }

    const data = await response.json();

    const capitals = data
      .filter((country: any) => country.capital && country.capital.length > 0 && country.capitalInfo?.latlng)
      .map((country: any) => ({
        country: country.name.common,
        capital: country.capital[0],
        lat: country.capitalInfo.latlng[0],
        lon: country.capitalInfo.latlng[1],
        language: country.languages ? Object.values(country.languages)[0] : "N/A", 
        flagUrl: country.flags.png, 
      }));

    return capitals;
  } catch (error) {
    console.error("Error fetching capitals data:", error);
    return [];
  }
};
