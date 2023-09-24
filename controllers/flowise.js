export const createPrediction = async (req, res) => {
  const { message } = req.body;
  console.log(message);

  try {
    // Call the Flowise API endpoint here..
    const flowiseData = {
      question: message,
    };

    // Call the Flowise Endpoint here
    const response = await fetch(
      `${process.env.FLOWISE_URL}/api/v1/prediction/${process.env.FLOW_ID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.FLOWISE_API_KEY}`
        },
        body: JSON.stringify(flowiseData),
      }
    );

    // Log the raw text response to debug
    const rawText = await response.text();
    console.log('Raw text response:', rawText);
    console.log(`Flowise ID: ${process.env.FLOWISE_ID}`);
    console.log(`Flowise API Key: ${process.env.FLOWISE_API_KEY}`);

    // Check if the response was successful
    if (response.ok) {
      const data = JSON.parse(rawText);
      console.log(data);
      res.status(200).json({ message: data });
    } else {
      console.log('Error in fetch:', rawText);
      // Handle error response here
      res.status(response.status).json({ message: rawText });
    }

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
