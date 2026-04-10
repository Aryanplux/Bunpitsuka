import { useState } from 'react';
import { Box, CircularProgress, Container, InputLabel, TextField, Typography } from '@mui/material';
import './App.css'
import { FormControl, MenuItem, Select } from '@mui/material';
import Button from '@mui/material/Button';
import axios from 'axios';

function App() {
  const[emailContent, setEmailContent] = useState('');
  const[tone, setTone] = useState('');
  const[generatedReply, setGeneratedReply] = useState('');
  const[loading, setLoading] = useState(false);
  const[error, setError] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try{
      const response = await axios.post("http://localhost:8081/api/email/generate", {
        emailContent,
        tone
      });
      setGeneratedReply(typeof response.data === 'string' ? response.data : JSON.stringify(response.data));
    }catch(error){
      setError('Failed to generate email reply. Please try again.');
      console.error(error);
    }finally{
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Bunpitsuka - AI Email Reply Generator
      </Typography>

      <Box sx={{ mt: 4 }}>
        <TextField
          fullWidth  
          label="Original Email Content"
          multiline
          rows={4}
          variant='outlined'
          value={emailContent || ''}
          onChange={(e) => setEmailContent(e.target.value)}
          sx={{mb : 2}}
        />

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Select Tone (Optional)</InputLabel>
          <Select
            value={tone || ''}
            onChange={(e) => setTone(e.target.value)}
            label={"Select Tone (Optional)"}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="formal">Formal</MenuItem>
            <MenuItem value="informal">Informal</MenuItem>
            <MenuItem value="friendly">Friendly</MenuItem>
            <MenuItem value="professional">Professional</MenuItem>
          </Select>
        </FormControl>

        <Button variant="contained" color="primary" onClick={handleSubmit} disabled={loading || !emailContent.trim()} fullWidth>
          {loading ? <CircularProgress size={24} /> : 'Generate Reply'}
        </Button>



      </Box>

      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}

      {generatedReply && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Generated Reply:
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={6}
            variant="outlined"
            value={generatedReply || ''}
            InputProps={{
              readOnly: true
            }}/>

            <Button variant="outlined" sx={{mt:2}} onClick={() => navigator.clipboard.writeText(generatedReply)}>
              Copy to Clipboard
            </Button>
        </Box>
      )}

    </Container>
  )
}

export default App
