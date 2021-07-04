import React, { FunctionComponent, useEffect, useState } from 'react';
import { GoogleMap } from '@components/Map';
import { Box, List, ListItem, ListItemText, makeStyles, Typography } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/redux';
import { PlaceResult } from '@components/Map/types';
import { HistoryPlaceResult, InterestPlaceResult } from './types';
import { onMapPlacedSearched, populateInterestPlaces } from './actions';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "2rem"
  },
  mapSection: {},
  historySection: {
    height: "35vh",
  },
  historyList: {
    height: "calc(100% - 40px)",
    overflowY: "auto",
  },
  interestPlaceSection: {
    height: "40vh",
  },
  interestPlaceList: {
    height: "calc(100% - 40px)",
    overflowY: "auto",
  },
  listItem: {
    "&:nth-child(odd)": {
      backgroundColor: "#ddd"
    },
    "&:nth-child(even)": {
      backgroundColor: "#eee"
    },
    "&:hover": {
      backgroundColor: theme.palette.action.hover
    }
  }
}));

const SearchMap: FunctionComponent = () => {

  const classes = useStyles();

  const interestPlaces = useSelector<RootState, InterestPlaceResult[]>((state) => state.searchMapReducer.interestPlaces);
  const isInterestPlaceLoading = useSelector<RootState, boolean>((state) => state.searchMapReducer.isInterestPlacesLoading);
  const interestPlaceLoadError = useSelector<RootState, string>((state) => state.searchMapReducer.interestPlacesLoadError);
  const searchHistoryPlaces = useSelector<RootState, HistoryPlaceResult[]>((state) => state.searchMapReducer.searchHistoryPlaces);
  
  const [overridePlace, setOverridePlace] = useState<InterestPlaceResult | HistoryPlaceResult>(undefined);
  const dispatch = useDispatch();

  const onPlaceChanged = (place: PlaceResult) => {
    setOverridePlace(undefined);
    dispatch(onMapPlacedSearched({
      description: place.description,
      place_id: place.place_id
    }))
  }

  const onHistoryOrInterestListItemClicked = (place: InterestPlaceResult | HistoryPlaceResult) => () => {
    setOverridePlace(place);
  }

  useEffect(() => {
    dispatch(populateInterestPlaces());
  }, [])

  return (
    <div className={classes.root}>
      <Typography variant="h2" gutterBottom>Maps</Typography>
      <Box className={classes.mapSection} display="flex" justifyContent="space-between">
        <Box width="48%">
          <GoogleMap overridePlace={overridePlace} searchPlaceHolder="Search Address" height="75vh" onPlaceChanged={onPlaceChanged} />
        </Box>
        <Box width="48%">
          <div className={classes.historySection}>
            <Typography variant="h4" gutterBottom>Search History</Typography>
            {
              <List dense className={classes.historyList}>
                {
                  searchHistoryPlaces.map(p => (
                    <ListItem className={classes.listItem} key={p.place_id} dense button onClick={onHistoryOrInterestListItemClicked(p)}>
                      <ListItemText primary={p.description} />
                    </ListItem>
                  ))
                }
              </List>
            }
          </div>
          <div className={classes.interestPlaceSection}>
            <Typography variant="h4" gutterBottom>Interest Places</Typography>
            {
              isInterestPlaceLoading
              ?
              <div>
                {
                  new Array(4).fill(0).map((s, i) => ((
                    <Skeleton style={{ backgroundColor: i % 2 ? "#eee" : "aaa" }} variant="rect" width={"100%"} height={50}/>
                  )))
                }
              </div>
              :
              <List dense className={classes.interestPlaceList}>
              {
                interestPlaces.map(p => (
                  <ListItem className={classes.listItem} key={p.place_id} dense button onClick={onHistoryOrInterestListItemClicked(p)}>
                    <ListItemText primary={p.description} />
                  </ListItem>
                ))
              }
              </List>
            }
          </div>
        </Box>
      </Box>
    </div>
  )
}

SearchMap.displayName = "Search Map";
export default SearchMap;