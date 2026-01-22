'use client';

import React from 'react'
import Image from 'next/image';

async function saveContent(content: any) {
  const response = await fetch("/api/engagements", {
    method: "POST",
    body: JSON.stringify(content)
  })

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
}

async function getPosts() {
  const response = await fetch("/api/engagements", {
    method: "GET",
  })

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
}

const engagements = () => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [posts, setPosts] = React.useState([{
    id: 0,
    title: "",
    description: "",
    city: "",
    state: "",
    zipcode: "",
    date: "",
  }]);

  React.useEffect(() => {
    const fetchData = async () => {
      const allPosts = await getPosts();
      setPosts(allPosts);
    }
    
    fetchData();
  }, []);

  React.useEffect(() => {
    setCurrentDate(new Date());
  }, []);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const [formData, setFormData] = React.useState({
    title: "",
    description: "",
    city: "",
    state: "",
    zipcode: "",
    date: "",
  });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    toggleVisibility();

    window.location.reload();

    await saveContent(formData);
  }

  return (
    <div>
      <div className="flex flex-row bg-gray-100">
        <div className="flex flex-row outline-2 outline solid">
          <Image onClick={toggleVisibility} className="hover:scale-110" src="/createposticon.png" alt="Create Post Button" width={75} height={75}></Image>
          <div className="mt-6 mr-5 text-xl font-bold">Create New Event</div>
        </div>
      </div>

      <form style={{ visibility: isVisible ? 'visible' : 'hidden' }} className="w-full max-w-lg mt-10">
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-title">
              Event Title
            </label>
            <input name="title" value={formData.title} onChange={handleChange} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Lake Michigan Cleanup"></input>
            <p className="text-gray-600 text-xs italic">Title your event so people recognize it</p>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-description">
              Description
            </label>
            <textarea name="description" value={formData.description} onChange={handleChange} id="message" rows={4} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Let's work together to remove trash from our local beaches..."></textarea>
            <p className="text-gray-600 text-xs italic">Let everyone know what's going on</p>
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-2">
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
              City
            </label>
            <input name="city" value={formData.city} onChange={handleChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="Chicago"></input>
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
              State
            </label>
            <div className="relative">
              <select name="state" value={formData.state} onChange={handleChange} className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
                <option>Alabama</option>
                <option>Alaska</option>
                <option>Arizona</option>
                <option>Arkansas</option>
                <option>California</option>
                <option>Colorado</option>
                <option>Connecticut</option>
                <option>Delaware</option>
                <option>Florida</option>
                <option>Georgia</option>
                <option>Hawaii</option>
                <option>Idaho</option>
                <option>Illinois</option>
                <option>Indiana</option>
                <option>Iowa</option>
                <option>Kansas</option>
                <option>Kentucky</option>
                <option>Louisiana</option>
                <option>Maine</option>
                <option>Maryland</option>
                <option>Massachusetts</option>
                <option>Michigan</option>
                <option>Minnesota</option>
                <option>Mississippi</option>
                <option>Missouri</option>
                <option>Montana</option>
                <option>Nebraska</option>
                <option>Nevada</option>
                <option>New Hampshire</option>
                <option>New Jersey</option>
                <option>New Mexico</option>
                <option>New York</option>
                <option>North Carolina</option>
                <option>North Dakota</option>
                <option>Ohio</option>
                <option>Oklahoma</option>
                <option>Oregon</option>
                <option>Pennsylvania</option>
                <option>Rhode Island</option>
                <option>South Carolina</option>
                <option>South Dakota</option>
                <option>Tennessee</option>
                <option>Texas</option>
                <option>Utah</option>
                <option>Vermont</option>
                <option>Virginia</option>
                <option>Washington</option>
                <option>West Virginia</option>
                <option>Wisconsin</option>
                <option>Wyoming</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-zip">
              Zip
            </label>
            <input name="zipcode" value={formData.zipcode} onChange={handleChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder="60607"></input>
          </div>
        </div>
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
          Date
        </label>
        <input name="date" value={formData.date} onChange={handleChange} className="appearance-none block w-sm bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder={currentDate.toLocaleDateString()}></input>
        <button onClick={handleSubmit} className="mt-5 bg-blue-500 text-white py-2 px-4 rounded-2xl shadow hover:bg-blue-600 transition-transform transform hover:scale-105">
          Create Event
        </button>
      </form>

      <div>
        <h1 className="font-bold">EVENT LIST</h1>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <span className="font-bold">Title: </span> {post.title} <span className="font-bold">Description: </span> {post.description}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default engagements