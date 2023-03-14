import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import { cacheResult } from "../utils/searchSlice";
import { YOUTUBE_SEARCH_API } from "../utils/constant";

const Head = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestion, setShowSuggestion] = useState(false);

  const searchCache = useSelector((store) => store.search);

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  useEffect(() => {
    //make api call after key press, but decline the api call if -
    // if difference between 2 key press events is less than 200ms

    const timer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        setSuggestions(searchCache[searchQuery]);
      } else {
        getSearchSuggestion();
      }
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const getSearchSuggestion = async () => {
    const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
    const json = await data.json();
    setSuggestions(json[1]);

    //update cache
    dispatch(
      cacheResult({
        [searchQuery]: json[1],
      })
    );
  };

  return (
    <div className="flex p-4 justify-between m-2 shadow-lg">
      <div className="flex">
        <img
          alt="menu"
          onClick={() => toggleMenuHandler()}
          className="h-8 hover:cursor-pointer"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/1024px-Hamburger_icon.svg.png"
        />
        <img
          alt="logo"
          className="h-8 ml-3 px-2"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/2560px-YouTube_Logo_2017.svg.png"
        />
      </div>
      <div className="w-[100%]">
        <div className="w-[100%] flex justify-center">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSuggestion(true)}
            onBlur={() => {
              setShowSuggestion(false);
            }}
            className="w-[65%] border border-gray-500 rounded-l-full p-2"
          />
          <button className="border border-gray-500 rounded-r-full p-1">
            <img
              alt="search"
              className="h-7 p-1 "
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAMAAABmmnOVAAAAYFBMVEX///8AAADm5ubs7Oz4+Pj19fXw8PA0NDRBQUE8PDykpKTCwsLc3NxmZmawsLAgICDLy8t6enqOjo4sLCydnZ1WVla6urpdXV2EhIRycnIYGBjU1NQlJSUODg5tbW1LS0uflzq3AAAErElEQVR4nO1b55qjMAwE0wm9hUDK+7/l7Vo0s2mSxbF3X+ZvsBmskTwuMYwPPvjgP4PtWkIIy7X3eb0rDkV88wOvPJde4N/i6iCcv8pAhFfP/Ak/D92/xCCqzncIjAhCsTkD+1BfnlD4Rhdn20qkub1gAKgP21E4lMqrbm2VNFnfZ1mTVK1K75ZtQyGq53ekcRitx9yOqribH7luoY1q0kIXN9aDh0QySyYNuSlYx+kTi+jpk1E7DwavQJvp86rXD9vV9DSnMsKx1/ZRHFSIfHj+krBxKIYug+eBWCIbE4lLGPHQ3xuRWGAcjJaFwwk6O2Pje+j4WAxiD95TwxKio4zgPQx6OFKyzfWhsa46E+jmRGvtDNVFbyqJhnGgtneh1Kf4WM6wYTxv9MrnQBWvNUhAmnk6tm1QJ12cBwjG+yVqi05SlppXaAUE5qFYk4NhBBp5aklNnfW9CaRYR2pbsBSauSdKWIVUhM/AwXBLapIBfR5XkhAH1e7YBuILcrl0QzcDQ9cwkYBE67HN5NTjczlVqN45spXL5ARGwASAbARS4lu/ZJQp/Up2MvfhyFVigWpjebzRGFwiTmM9czTGeKDMTUjR0VM4eFFceebPBewaLYqAw0ioaLHf5ZT6HnkNGeEaoUxpDC/oKvsU0uZhllBSyinvVou0Nh3CasrZy+Pd4nCxc5gs2h4rB8PG+hNJIuAlYXxIaJHYWxPNBiQcbHbIwlLyHhtYWBL9BVlY3oAsgCWiAMLCh3ePXIbYx4yux7UCnCFdP2rLh+AIX0H6bdTeV8ueHnaJtigNu72D5EBpPcJWlpeQ9e+CynpYJvBsSwNigmuVogj4TlvFmeBaM2x9e4GGtJAx0Rn1FDK8Z2yrgtVmwooOvYaAZlz1Kid+Euw+8phdKBKEFR1sB/MszHN8pQLYcO6sc0gwoqcOxJhV2H2me6g18h2GQn9FCvsMxIMbGMVU1+UJk6oICblLYV71OMDGBD3ZrY5WYxTAkabGNDSc2ujs61Z6wfgGfMaFbiyG6wZa5caGuknex4PJmH6kCXDhHIyY5MM4aBxpAno42Owo5WI4XjZ97cl4ECdhFTJdKDED7RXlyAJZwJ3YnOGxsUDdoDiYCgLtiPSDOs3i3Q+aLtVM8LWnYzFe+SvfU0Z4536e1ok7YPqyS/KqMzf8yUCy0DeszXSjzSue9GZHxXRR8ry6LqifqYZYXL2Lw/sRtsL5Ypp5EoYIuCNiNMtLiF6b9EuZulnSLi+LBjKVXPUCq8dhFiu1zy7141Pe5qejn3bKL/4oYFcdC4aIfI93ar5GuRCv8FUWPLtxzfHBq0dc1WnGWkWEaZHthHH3gEB3/ZnBtspCv3aOsLKiDlQmaVAX2V3hWauIcJ6jOFHWhF+qPJ3yImmy6PE4i1VE9rnv7myQqXhsGZH3scpUfZdDwrp27sPCUWsnX6aisK6dO6lzm9qJxKp2MrgcCn5JpvK7HAK2cDkEFr8jIpu4HCzWmbpT7dzK5aCwztR91Pk7XM6vrJ2cp20IKJka7/Qvy2Xt1Nzc08HkcjT3rfUwRIT532JYyNq5YywAX5nKetWRBtHuG4sPPvjgH8QfDMIq//YcqPYAAAAASUVORK5CYII="
            />
          </button>
        </div>
        {showSuggestion && (
          <div className="fixed ml-80 bg-slate-50 w-96">
            <ul className="px-5 py-3">
              {suggestions.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div>
        <img
          alt="user"
          className="h-8"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHkAAAB5CAMAAAAqJH57AAAAYFBMVEX///8AAADt7e35+fn8/Pz09PTx8fEuLi6oqKhXV1fOzs6SkpK4uLjIyMghISF8fHxNTU3Y2NihoaE4ODjf399wcHASEhLn5+eIiIgZGRlhYWEoKCjCwsJGRkY9PT1nZ2fOegn+AAADlklEQVRoge1a15KrMAwNzUDoEAjp//+Xm9xYLoTggsjMnfF5XBQfrC6xu52Dg4ODg4ODw/+MgBCfkODHrFEx9vVl8IZL3Y/X6Fe0QZJ6MtLkF+R+5c2hOm7MG42zvP+4yZbE+eUrseeV+Wa84fcL02uHGxHXCmLPu20SZNFd1m1aZW1WpaX013gDY4edSJA07EGTSE/wby3EcLqfPNuLD7GJM3b0cJ15XJzY8xGX+MoOructSfi1UYMrYqbsv8qw3IbqZZmaWKBG1LfP3GcxVZxBDC+Hw5WH5SP9E/qldX0nB0GsLAoH1krJVPMVdQH2K5SSe+R0AjrUEC1R1d3Q0zIN2ZbKTvOrHUxOg7dsUZgrEw1S2QqFmTpYrCXcIbpYeDM57PEW7jDKdNCpUzYHbdVQGoQgNkmJ2QbMeneuEJnN7EzdsUNJJdRpSi3hGDN9QjzrTG0hajwn9LS5zm+KAjWHHTx954YeolGL6sCgVhmI6gAMra730EPoRaAa0GzHqlAJYfTScQktgA5VftMiK1tot5cdB1xRq4fQQwBHXpbGhygGMcR9DYT00mjOB3ucYKZgp96+3ZowkRp1ZwH91dPB523dMFUjdX8MTN9P//k0Y8DHa1xdvyAs4OJWtnaY8Asj1QoJ0sqxysHeJJeWguoJyAJnT0Z37s/d5G/oW5I3ek8FrHz9gfy0yHtKtiLeRfN7XnbjrXauUba0b32hHDfZc+elgveFAV/hR/W69Y37AZe4nSM5xbMeh1cjn8nxMbFn3xY+feYXbT+xQ4pmbT8Wz43HZloqg8MopZQSSeOHQTi0/vKNKLpKjoDS9TbCgbel1q4QuRFKZSPcuFXUfKGUDqtvTbj3dL5a+sap1dKLCLjn6E3u/PPOyhGalyfd5MQ1/lhDzI/R32Ty9f+KvohYEAsb3xV77ofd2zNNWXcoMIYbtxqsjNtOdhAipXHrDoW8syNm9jJPCmy2s1qxwzbKqoOGsL7bBDXs50823VUEqU/9HeAT4Nh2hR5aibP5T4+0UpR2+ZeAk5mXaghK229PMOOZt4QwRtlWO3Bv42xCaAdkP4bTV7+YWgs8276RBB8z9e5kpbK5uk0rFo2pxWXQMmBVZBpXlj8TAS9v9qugtM+cAFqxSrO+H/LImnULdZXBLJeAa6/5nAu1zqz1BuY1S1toLMzCqrB6XxmN1dsH/htrFokhPePX/yro4ODg4ODg4GCAP2aaHzIjX1W+AAAAAElFTkSuQmCC"
        />
      </div>
    </div>
  );
};

export default Head;
