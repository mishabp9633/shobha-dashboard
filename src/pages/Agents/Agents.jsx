import React, { useEffect, useState } from "react";
import classes from "./Agents.module.css";
import agents from "../../assets/agents.svg";
import dots from "../../assets/three_dots.svg";
import profile from "../../assets/profileAvatar_orange.svg";
import logoIcon from "../../assets/logo-white.svg";
import AddButton from "../../components/common-components/AddButton/AddButton";
import SearchInput from "../../components/common-components/SearchInput/SearchInput";
import AddAgentModal from "../../components/Modals/AddAgentModal/AddAgentModal";
import EditDeleteModal from "../../components/Modals/EditDeleteModal/EditDeleteModal";
import UserDetail from "../../components/common-components/UserDetail/UserDetail";
import PageDetail from "../../components/common-components/PageDetail/PageDetail";
import ConfirmationModal from "../../components/Modals/ConfirmationModal/ConfirmationModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  agentCreate,
  agentDelete,
  agentUpdate,
  agentUsers,
  allAgentsGet,
} from "../../Store/agentSlice";

const Agents = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [showOption, setShowOption] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [saveConfirm, setSaveConfirm] = useState(false);
  const [selectAgent, setSelectAgent] = useState(false);
  const [createAgent, setCreateAgent] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [editAgent, setEditAgent] = useState();
  const [agentDetails, setAgentDetails] = useState();
  const [activeCardIndex, setActiveCardIndex] = useState(null);

  const { totalAgent, totalagentUsers } = useSelector((state) => state.agents);

  const deleteAgent = useSelector((state) => state.agents.deleteAgent);

  useEffect(() => {
    dispatch(allAgentsGet());
  }, []);

  const agentUsersGet = (agentId) => {
    setActiveCardIndex(agentId);
    dispatch(agentUsers(agentId));
    setSelectAgent(true);
  };

  const handleClick = (id, details) => {
    setShowOption({ ...showOption, [id]: !showOption[id] });
    setAgentDetails(details);
  };

  const handleModal = () => {
    setShowModal(!showModal);
  };

  const handleEditModal = () => {
    setShowEdit(!showEdit);
    setShowOption(!showOption);
  };

  const handleConfirm = () => {
    setShowConfirm(!showConfirm);
    setShowOption(!showOption);
  };
  const handleSaveConfirm = (input) => {
    setEditAgent(input);
    setSaveConfirm(!saveConfirm);
  };

  const handleCreateAgent = (input) => {
    setIsLoading(true);
    dispatch(
      agentCreate({
        name: input?.fullName,
        phone: `+91${input?.phoneNumber}`,
        image: input?.image,
      })
    ).then((response) => {
      if (response.payload) {
        toast.success("Agent Created Successfully", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        dispatch(allAgentsGet());
        handleModal();
        setIsLoading(false);
      }
    });
  };

  const handleUpdateAgent = () => {
    const data = {
      name: editAgent?.fullName,
      phone: editAgent?.phoneNumber
        ? `+91${editAgent?.phoneNumber}`
        : agentDetails?.phone,
      image: editAgent?.image,
    };
    dispatch(
      agentUpdate({
        agentId: agentDetails?._id,
        data,
      })
    ).then((response) => {
      if (response.payload) {
        toast.success("Agent Updated Successfully", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        dispatch(allAgentsGet());
        setSaveConfirm(!saveConfirm);
        handleEditModal();
      }
    });
  };

  const handleDeleteAgent = () => {
    dispatch(agentDelete(agentDetails?._id)).then((response) => {
      if (response.payload) {
        toast.success("Agent Deleted Successfully", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        dispatch(allAgentsGet());
        setShowConfirm(!showConfirm);
      } else {
        toast.error("Agent has schemes", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setShowConfirm(!showConfirm);
      }
    });
  };

  const limitPersonName = (personName) => {
    if (personName) {
      const words = personName.split(" ");
      if (words.length > 4) {
        return words.slice(0, 4).join(" ") + " ...";
      }
      return personName;
    }
    return "";
  };

  const formatNumberWithCommas = (number) => {
    if (number === null || number === undefined) {
      return "";
    }
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <>
      <div className={classes.agents_main}>
        <PageDetail image={agents} heading="Agents" count={totalAgent.total} />
        <div className={classes.agents_search_section}>
          <SearchInput />
          <AddButton text="Add Agent" onClick={handleModal} />
        </div>

        <div className={classes.agents_content_section}>
          <div className={classes.agents_agentCard_section}>
            {totalAgent?.agents?.map((agent) => (
              <div
                onClick={() => agentUsersGet(agent?._id)}
                key={agent?._id}
                className={`${classes.agents_agentCard} ${
                  activeCardIndex === agent?._id ? classes.activeCard : ""
                }`}
              >
                <UserDetail
                  image={
                    agent?.profilePhoto?.url
                      ? agent?.profilePhoto?.url
                      : profile
                  }
                  name={agent?.name}
                  number={agent?.phone}
                />
                <img
                  src={dots}
                  alt="Dots"
                  className={classes.agents_threeDots}
                  onClick={() => handleClick(agent?._id, agent)}
                />
                {showOption[agent?._id] && (
                  <EditDeleteModal
                    onClose={() => setShowOption(!showOption)}
                    editText="Edit"
                    editClick={handleEditModal}
                    deleteClick={handleConfirm}
                  />
                )}
              </div>
            ))}
          </div>

          <div className={classes.agents_second_section}>
            {selectAgent ? (
              <>
                <h3 className={classes.agents_linkedUsersText}>
                  Agent-Linked Users
                </h3>
                <div className={classes.agents_table_container}>
                  {totalagentUsers?.findSchemes &&
                  totalagentUsers?.findSchemes.length !== 0 ? (
                    <table className={classes.agents_table}>
                      <thead>
                        <tr>
                          <th className={classes.agents_table_header}>Name</th>
                          <th className={classes.agents_table_header}>
                            Phone number
                          </th>
                          <th className={classes.agents_table_header}>
                            Balance
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {totalagentUsers?.findSchemes?.map((user) => (
                          <tr key={user._id}>
                            <td className={classes.agents_table_data}>
                              {limitPersonName(user?.user?.name)}
                            </td>
                            <td className={classes.agents_table_data}>
                              {user?.user?.phone}
                            </td>
                            <td className={classes.agents_table_data}>
                              <div className={classes.agents_table_data_amount}>
                                ₹{formatNumberWithCommas(user?.totalAmount)}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className={classes.noUserFound_text}>
                      No Users Found
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className={classes.agents_blankMessage_container}>
                <img
                  src={logoIcon}
                  alt="Image"
                  className={classes.agents_blankMessage_image}
                />
                <p className={classes.agents_blankMessage_para}>
                  Click on an Agent to Display Associated Users Here.
                </p>
              </div>
            )}
          </div>
        </div>
        <ToastContainer />
      </div>
      {showModal && (
        <AddAgentModal
          isLoading={isLoading}
          confirmClick={handleCreateAgent}
          handleModal={handleModal}
          heading="Add agent"
          firstInputLabel="Full name"
          numberInputLabel="Phone number"
          role="Agent"
          imagePickerLabel="Set agent profile picure"
          confirmText="Add"
        />
      )}
      {showEdit && (
        <AddAgentModal
          confirmClick={handleSaveConfirm}
          handleModal={handleEditModal}
          heading="Edit Agent info"
          firstInputLabel="Full name"
          role="Agent"
          numberInputLabel="Phone number"
          confirmText="Update"
          imagePickerLabel="Set agent profile picure"
          fullName={agentDetails?.name}
          phoneNumber={
            agentDetails?.phone
              ? Number(
                  agentDetails.phone.replace(/[^0-9]/g, "").replace(/^91/, "")
                )
              : undefined
          }
          image={
            agentDetails?.profilePhoto?.url
              ? agentDetails?.profilePhoto?.url
              : profile
          }
        />
      )}
      {saveConfirm && (
        <ConfirmationModal
          acceptClick={handleUpdateAgent}
          cancleClick={handleSaveConfirm}
          heading="Save changes"
          paragraph="Are you sure you want to save the changes?"
          cancelText="Don’t save"
          acceptText="Save"
        />
      )}
      {showConfirm && (
        <ConfirmationModal
          acceptClick={handleDeleteAgent}
          cancleClick={handleConfirm}
          heading="Delete this account"
          paragraph="Are you sure you want to delete this account?"
          cancelText="Cancel"
          acceptText="Delete"
        />
      )}
    </>
  );
};

export default Agents;
