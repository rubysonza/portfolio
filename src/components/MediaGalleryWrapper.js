import MediaGallery from './MediaGallery';

export default function MediaGalleryWrapper({ section, gallery }) {
  const sectionData = gallery.find((item) => item.section === section);

  if (!sectionData || !sectionData.media) {
    return null;
  }

  return <MediaGallery media={sectionData.media} />;
}