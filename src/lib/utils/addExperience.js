export async function addExperience(addAmount) {
	if (!addAmount) {
		console.warn("Amount to add is zero or not defined.");
		return;
	}

	try {
		const requestBody = {
			id: localStorage.getItem("id"),
			experience: Number(addAmount),
		};

		const experienceEndpoint = "https://accounts.openguessr.com/accounts/update/add-experience";

		// Make the PUT request using Fetch API
		const response = await fetch(experienceEndpoint, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("bearer")}`,
			},
			body: JSON.stringify(requestBody),
		});

		// Check if the response is successful
		if (response.ok) {
			const data = await response.json();
			if (data?.user?.experience) localStorage.setItem("experience", data?.user?.experience);
		} else {
			console.error("Experience update failed, Status: " + response.status + ", Error " + response?.error);
		}
	} catch (error) {
		console.error("Error occurred during experience update: ", error);
	}
}
