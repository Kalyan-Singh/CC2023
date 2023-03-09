import { useCreateAsset, createError, createStatus } from '@livepeer/react';
import { useCallback, useState, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Box,
  Button,
  Center,
  CircularProgress,
  Text,
} from '@chakra-ui/react';

const CreateAndViewAsset = () => {
  const [video, setVideo] = useState();
  const {
    mutate: createAsset,
    data: asset,
    status,
    progress,
    error,
  } = useCreateAsset(
    video
      ? {
          sources: [{ name: video.name, file: video }],
        }
      : null,
  );

  const onDrop = useCallback(async (acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0 && acceptedFiles?.[0]) {
      setVideo(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'video/*': ['*.mp4'],
    },
    maxFiles: 1,
    onDrop,
  });

  const progressFormatted = useMemo(
    () =>
      progress?.[0].phase === 'failed'
        ? 'Failed to process video.'
        : progress?.[0].phase === 'waiting'
        ? 'Waiting'
        : progress?.[0].phase === 'uploading'
        ? `Uploading: ${Math.round(progress?.[0]?.progress * 100)}%`
        : progress?.[0].phase === 'processing'
        ? `Processing: ${Math.round(progress?.[0].progress * 100)}%`
        : null,
    [progress],
  );

  return (
    <Box p={4} bg="gray.100">
      <Center h="full">
        <Box
          border="2px dashed gray"
          borderRadius="md"
          p={4}
          textAlign="center"
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <Text fontSize="xl">
            Drag and drop or click here to select a video file
          </Text>
        </Box>
      </Center>

      {error && <Text color="red.500">{error.message}</Text>}

      {video ? (
        <Box mt={4}>
          <Text fontSize="lg" fontWeight="bold">
            Selected video:
          </Text>
          <Text>{video.name}</Text>
        </Box>
      ) : (
        <Text mt={4}>No video selected.</Text>
      )}

      {progressFormatted && (
        <Center mt={4}>
          {status === 'loading' ? (
            <CircularProgress isIndeterminate />
          ) : (
            <Text>{progressFormatted}</Text>
          )}
        </Center>
      )}

      <Center mt={4}>
        <Button
          colorScheme="green"
          onClick={createAsset}
          disabled={!createAsset || status === 'loading'}
        >
          Upload
        </Button>
      </Center>
    </Box>
  );
};

export default CreateAndViewAsset;
