import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(express.static('public'));

app.post('/api/notion/:lobbyId', async (req, res) => {
    const { lobbyId } = req.params;

    try {
        const response = await axios.post(
            `https://api.notion.com/v1/databases/${lobbyId}/query`,
            {},
            {
                headers: {
                    'Authorization': `Bearer ${process.env.NOTION_TOKEN}`,
                    'Notion-Version': '2022-06-28',
                    'Content-Type': 'application/json',
                },
            }
        );
        res.status(200).json({data: response.data, msg: 'Data fetched successfully'});
    } catch (error) {
        res.status(error.response?.status || 500).json({ error: error.message });
    }
});

app.post('/api/notion/block/:blockId', async (req, res) => {
  const { blockId } = req.params;
  const {summaries} = req.body;
  try {
      const response = await axios.patch(
          `https://api.notion.com/v1/blocks/${blockId}`,
          {
            paragraph: {
              rich_text: [
                {
                  type: 'text',
                  text: {
                    content: summaries,
                  },
                },
              ],
            },
          },
          {
              headers: {
                  'Authorization': `Bearer ${process.env.NOTION_TOKEN}`,
                  'Notion-Version': '2022-06-28',
                  'Content-Type': 'application/json',
              },
          }
      );
      res.status(200).json({data: response.data, msg: 'Data send successfully'});
  } catch (error) {
      res.status(error.response?.status || 500).json({ error: error.message });
  }
});


app.post('/api/notion/block/fetch/:blockId', async (req, res) => {
  const { blockId } = req.params;
  try {
      const response = await axios.get(
          `https://api.notion.com/v1/blocks/${blockId}`,
          {
              headers: {
                  'Authorization': `Bearer ${process.env.NOTION_TOKEN}`,
                  'Notion-Version': '2022-06-28',
                  'Content-Type': 'application/json',
              },
          }
      );
      res.status(200).json({data: response.data, msg: 'Data fetch successfully'});
  } catch (error) {
      res.status(error.response?.status || 500).json({ error: error.message });
  }
});

app.listen(3000,()=>{
  console.log("Server is running on port 3000");
});