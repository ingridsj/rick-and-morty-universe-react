import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { api } from "../../service/api";
import "./index.scss";

import { Loading } from "../Loading";

export function Statistics() {
  const [seasonsList, setSeasonsList] = useState([]);
  const [locationsList, setLocationsList] = useState([]);
  const [loading, setLoading] = useState(null);

  let seasonNumber = 0;
  const seasons = [];

  const getSeasonList = async () => {
    seasonNumber++;
    try {
      setLoading(true);
      const response = await api.get(`/episode/?episode=s0${seasonNumber}`);
      seasons.push(response.data.results);
    } catch (err) {
      setLoading(false);
      setSeasonsList(
        seasons.map((season, index) => {
          return {
            name: `Season ${index + 1}`,
            size: season.length,
          };
        })
      );
      return;
    }
    getSeasonList();
  };

  let locationNumber = 0;
  const locations = [];

  const getLocationsList = async () => {
    locationNumber++;
    try {
      setLoading(true);
      const response = await api.get(`/location/${locationNumber}`);
      locations.push(response.data);
    } catch (err) {
      setLoading(false);
      setLocationsList(locations);
      return;
    }
    getLocationsList();
  };

  useEffect(() => {
    getSeasonList();
    getLocationsList();
  }, []);

  if (loading) {
    return <Loading width="150px" height="150px" />;
  }

  const numberPlanets = locationsList
    ?.map((location) => {
      return {
        name: location.name,
        characters: location.residents.length,
      };
    })
    .sort((a, b) => b.characters - a.characters);

  return (
    <div className="Charts">
      <div className="episodes-per-season">
        <h1>Total episodes per season</h1>
        <div style={{ width: "100%" }}>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                dataKey="size"
                startAngle={0}
                endAngle={360}
                data={seasonsList}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#FFBB28"
                label
              />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="characters-per-planet">
        <h1>Total characters per planet</h1>
        <div style={{ width: "100%" }}>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={numberPlanets}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" style={{ display: "none" }} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="characters" fill="#0088FE" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
