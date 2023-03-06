import React, { useState } from 'react';
import {Player, useCreateStream } from '@livepeer/react';
import { Box, Button, Input } from '@chakra-ui/react';

function Stream() {
  const [streamName, setStreamName] = useState('');
  
  const {
    mutate: createStream,
    data: stream,
    status,
  } = useCreateStream({ name: streamName });

  const handleInputChange = (event) => {
    setStreamName(event.target.value);
  }

  return (
    <>
      <Input
        placeholder="Enter stream name"
        value={streamName}
        onChange={handleInputChange}
      />
      <Button
        disabled={status === 'loading' || !createStream}
        onClick={() => createStream?.()}
      >
        Create Stream
      </Button>
      {stream && <Box>Stream Key: {stream.streamKey}</Box>}
      {stream && <Box>Playback ID: {stream.playbackId}</Box>}
      {stream && <Player playbackId={stream.playbackId}/>}
    </>
  );
}

export default Stream;