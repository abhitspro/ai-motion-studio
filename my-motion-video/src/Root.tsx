import { Composition } from "remotion";
import { Series } from "remotion";
import { Scene1 } from "./scenes/Scene1";
import { Scene2 } from "./scenes/Scene2";
import { Scene3 } from "./scenes/Scene3";

const MasterStoryVideo: React.FC = () => {
  return (
    <Series>
      <Series.Sequence durationInFrames={150}>
        <Scene1 />
      </Series.Sequence>
      <Series.Sequence durationInFrames={150}>
        <Scene2 />
      </Series.Sequence>
      <Series.Sequence durationInFrames={150}>
        <Scene3 />
      </Series.Sequence>
    </Series>
  );
};

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MasterStory"
        component={MasterStoryVideo}
        durationInFrames={450}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
