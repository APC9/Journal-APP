import { Box, ImageList, ImageListItem } from "@mui/material";
import { useSelector } from "react-redux";


export const ImageGallery = ({ images = [] }) => {   

    return (
        <Box sx={{ width: '100%', height: 450 }}>
        <ImageList variant="masonry" cols={4} gap={4}>
            { images.map( ( image, ind ) => (
                <ImageListItem key={ image }>
                    <img
                    src={`${ image }?w=248&fit=crop&auto=format`}
                    srcSet={`${ image }?w=248&fit=crop&auto=format&dpr=2 2x`}
                    alt={ `esta es la imagen de la nota ${ind}` }
                    loading="lazy"
                    />
                </ImageListItem>
            ))}
        </ImageList>
        </Box>
    );
}
