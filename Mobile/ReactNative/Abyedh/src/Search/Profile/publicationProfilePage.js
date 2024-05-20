import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Image, Button, ScrollView, StyleSheet, Dimensions } from 'react-native';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import detectRTL from 'rtl-detect';
import GConf from '../../AssetsM/generalConf';
import { SvgUri } from 'react-native-svg';

// const GConf = {
//   ApiLink: 'https://api.example.com', // Update this link to your actual API
//   ADIL: {
//     Tag: {
//       themeColor: '#000000' // Update this to your actual theme color
//     }
//   }
// };

function PublicationProfilePage(props) {
  const route = useRoute();
  //const { Tag, PID } = route.params;
  let Tag = 'coiffure'
  let PID =  1773836345 
  const [loading, setLoading] = useState(true);
  const [postsListe, setPostsListe] = useState([]);
  const { t, i18n } = useTranslation();
  const isRTL = detectRTL.isRtlLang(i18n.language);

  useEffect(() => {
    axios.post(`${GConf.ApiLink}/publications`, {
      PID: PID,
    }).then(function (response) {
      setPostsListe(response.data);
      setLoading(false);
    });
  }, [PID]);

  const PublicationEmtyCard = () => (
    <View style={styles.cardBody}>
      <View style={styles.center}>
        <SvgUri
            width="150"
            height="150"
            uri='https://cdn.abyedh.tn/images/Search/blog-post.svg'
        />
      </View>
      <Text style={styles.centerText}>{t('profilePage.PostsTabs.noPostToShow')}</Text>
    </View>
  );

  const PublicationGenreCard = ({ status, postData }) => {
    const StateCard = ({ color, text }) => (
      <Text style={{ ...styles.badge, backgroundColor: color }}>{text}</Text>
    );

    const statusCard = useCallback(() => {
      switch (status) {
        case 'text':
          return <TextPostCard data={postData} Name={props.pidData.genrale[0].Name} />;
        case 'article':
          return <ArticlePostCard data={postData} Name={props.pidData.genrale[0].Name} />;
        case 'image':
          return <ImagePostCard data={postData} Name={props.pidData.genrale[0].Name} />;
        case 'video':
          return <VideoPostCard data={postData} Name={props.pidData.genrale[0].Name} />;
        default:
          return <Text>Indefinie Poste</Text>;
      }
    }, [status]);

    return <View style={styles.containerStopped}>{statusCard()}</View>;
  };

  const TextPostCard = ({ data, Name }) => (
    <View style={styles.card}>
      <View style={styles.cardBody}>
        <View style={{ ...styles.row, flexDirection: isRTL ? 'row-reverse' : 'row' }}>
          <Image
            source={{ uri: `https://cdn.abyedh.tn/images/Search/CIcons/${Tag}.gif` }}
            style={styles.iconImage}
          />
          <View style={styles.flexGrow}>
            <Text style={styles.boldText}>{Name}</Text>
            <Text style={styles.smallText}>
              {data.Pub_Time.slice(0, -3)} | {new Date(data.Pub_Date).toLocaleDateString('fr-FR').split('/').reverse().join('-')}
            </Text>
          </View>
        </View>
        <Text style={{ marginTop: 10, marginBottom: 10, direction: isRTL ? 'rtl' : 'ltr' }}>
          {data.TextData}
        </Text>
      </View>
      <View style={styles.buttonGroup}>
        <Button title="Like" color={GConf.ADIL[Tag].themeColor} />
        <Button title="Comments" color={GConf.ADIL[Tag].themeColor} />
        <Button title="Share" color={GConf.ADIL[Tag].themeColor} />
      </View>
    </View>
  );

  const ArticlePostCard = ({ data, Name }) => (
    <View style={styles.card}>
      <View style={styles.cardBody}>
        <View style={{ ...styles.row, flexDirection: isRTL ? 'row-reverse' : 'row' }}>
          <Image
            source={{ uri: `https://cdn.abyedh.tn/images/Search/CIcons/${Tag}.gif` }}
            style={styles.iconImage}
          />
          <View style={styles.flexGrow}>
            <Text style={styles.boldText}>{Name}</Text>
            <Text style={styles.smallText}>
              {data.Pub_Time.slice(0, -3)} | {new Date(data.Pub_Date).toLocaleDateString('fr-FR').split('/').reverse().join('-')}
            </Text>
          </View>
        </View>
        <Text style={{ marginTop: 10, marginBottom: 10, direction: isRTL ? 'rtl' : 'ltr' }}>
          {data.ArticleData}
        </Text>
      </View>
      <View style={styles.buttonGroup}>
        <Button title="Like" color={GConf.ADIL[Tag].themeColor} />
        <Button title="Comments" color={GConf.ADIL[Tag].themeColor} />
        <Button title="Share" color={GConf.ADIL[Tag].themeColor} />
      </View>
    </View>
  );

  const ImagePostCard = ({ data, Name }) => {
    const imageData = JSON.parse(data.ImageData);
    return (
      <View style={styles.card}>
        <View style={styles.cardBody}>
          <View style={{ ...styles.row, flexDirection: isRTL ? 'row-reverse' : 'row' }}>
            <Image
              source={{ uri: `https://cdn.abyedh.tn/images/Search/CIcons/${Tag}.gif` }}
              style={styles.iconImage}
            />
            <View style={styles.flexGrow}>
              <Text style={styles.boldText}>{Name}</Text>
              <Text style={styles.smallText}>
                {data.Pub_Time.slice(0, -3)} | {new Date(data.Pub_Date).toLocaleDateString('fr-FR').split('/').reverse().join('-')}
              </Text>
            </View>
          </View>
          <Text style={{ marginTop: 10, marginBottom: 10, direction: isRTL ? 'rtl' : 'ltr' }}>
            {imageData.text}
          </Text>
        </View>
        <Image source={{ uri: imageData.url }} style={styles.postImage} />
        <View style={styles.buttonGroup}>
          <Button title="Like" color={GConf.ADIL[Tag].themeColor} />
          <Button title="Comments" color={GConf.ADIL[Tag].themeColor} />
          <Button title="Share" color={GConf.ADIL[Tag].themeColor} />
        </View>
      </View>
    );
  };

  const VideoPostCard = ({ data, Name }) => {
    const videoData = JSON.parse(data.VideoData);
    return (
      <View style={styles.card}>
        <View style={styles.cardBody}>
          <View style={{ ...styles.row, flexDirection: isRTL ? 'row-reverse' : 'row' }}>
            <Image
              source={{ uri: `https://cdn.abyedh.tn/images/Search/CIcons/${Tag}.gif` }}
              style={styles.iconImage}
            />
            <View style={styles.flexGrow}>
              <Text style={styles.boldText}>{Name}</Text>
              <Text style={styles.smallText}>
                {data.Pub_Time.slice(0, -3)} | {new Date(data.Pub_Date).toLocaleDateString('fr-FR').split('/').reverse().join('-')}
              </Text>
            </View>
          </View>
          <Text style={{ marginTop: 10, marginBottom: 10, direction: isRTL ? 'rtl' : 'ltr' }}>
            {videoData.text}
          </Text>
        </View>
        <iframe
          width="100%"
          height="250"
          src={`https://www.youtube.com/embed/${videoData.url}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <View style={styles.buttonGroup}>
          <Button title="Like" color={GConf.ADIL[Tag].themeColor} />
          <Button title="Comments" color={GConf.ADIL[Tag].themeColor} />
          <Button title="Share" color={GConf.ADIL[Tag].themeColor} />
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
        
      {loading ? null : postsListe.length === 0 ? <PublicationEmtyCard /> : postsListe.map((data, index) => (
        <PublicationGenreCard key={index} status={data.Pub_Genre} postData={data} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  card: {
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    overflow: 'hidden',
  },
  cardBody: {
    padding: 10,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    height : Dimensions.get('window').height /2
  },
  centerText: {
    textAlign: 'center',
    marginTop: 10,
  },
  emptyImage: {
    width: '10%',
    height: 50,
  },
  iconImage: {
    width: 50,
    height: 50,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexGrow: {
    flex: 1,
    marginLeft: 10,
  },
  boldText: {
    fontWeight: 'bold',
  },
  smallText: {
    fontSize: 12,
  },
  postImage: {
    width: '100%',
    height: 200,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default PublicationProfilePage;
