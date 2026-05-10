import React, { useState } from "react";
import { type NewDiaryEntry } from "../../types";
import { Visibility } from "../../types";
import { Weather } from "../../types";

export default function DiaryForm({ addDiary }) {
  const [formData, setFormData] = useState<NewDiaryEntry>({
    date: "",
    weather: "sunny",
    visibility: "great",
    comment: "",
  });

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const diaryToAdd = {
      date: formData.date,
      weather: formData.weather,
      visibility: formData.visibility,
      comment: formData.comment,
    };
    addDiary(diaryToAdd);
    setFormData({
      date: "",
      weather: "sunny",
      visibility: "great",
      comment: "",
    });
  };

  return (
    <form action="submit" onSubmit={handleSubmit}>
      <label htmlFor="date">Date: </label>
      <input
        id="date"
        name="date"
        type="date"
        value={formData.date}
        onChange={onChange}
      />

      <div>
        <label>Weather: </label>
        {Object.values(Weather).map((weatherOption) => (
          <label key={weatherOption} style={{ marginRight: "10px" }}>
            <input
              type="radio"
              name="weather"
              value={weatherOption}
              checked={formData.weather === weatherOption}
              onChange={onChange}
            />
            {weatherOption}
          </label>
        ))}
      </div>

      <div>
        <label>Visibility: </label>
        {Object.values(Visibility).map((visibilityOption) => (
          <label key={visibilityOption} style={{ marginRight: "10px" }}>
            <input
              type="radio"
              name="visibility"
              value={visibilityOption}
              checked={formData.visibility === visibilityOption}
              onChange={onChange}
            />
            {visibilityOption}
          </label>
        ))}
      </div>

      <label htmlFor="comment">Comment: </label>
      <input
        id="comment"
        name="comment"
        type="text"
        value={formData.comment}
        onChange={onChange}
      />

      <button>Send</button>
    </form>
  );
}
