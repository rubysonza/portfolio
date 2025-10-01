import ImageGallery from './ImageGallery';

export default function ImageGalleryWrapper({ section, gallery }) {
  const sectionData = gallery.find((item) => item.section === section);

  if (!sectionData) {
    return null;
  }

  return <ImageGallery images={sectionData.images} />;
}