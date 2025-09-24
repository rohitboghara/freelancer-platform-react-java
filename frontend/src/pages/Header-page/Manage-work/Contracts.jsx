import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Badge, Loader, Paper, Text, Modal, Rating, Textarea } from "@mantine/core";
import { DollarSign } from "lucide-react";

const Contracts = () => {
  const [state, setState] = useState({
    contracts: [],
    loading: true,
    error: null,
    modalOpen: false,
    selectedContract: null,
    review: '',
    rating: 0,
    role: null,
    userId: null
  });

  const updateState = (updates) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      updateState({ role: decoded.role, userId: decoded.id });
    }
  }, []);

  const fetchContracts = useCallback(async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/contract/myContract`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
      updateState({ contracts: res.data, loading: false });
    } catch (e) {
      updateState({ error: "Error fetching contracts", loading: false });
      console.error(e);
    }
  }, []);

  useEffect(() => {
    fetchContracts();
  }, [fetchContracts]);

  const handleModalActions = {
    open: (contract) => updateState({ selectedContract: contract, modalOpen: true }),
    close: () => updateState({ modalOpen: false, selectedContract: null, review: '', rating: 0 })
  };

  const handleSubmit = async () => {
    try {
      const { selectedContract, role, review, rating } = state;

      if (role === "CLIENT" && selectedContract.status === "ACTIVE") {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/contract/close/${selectedContract.id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          }
        );
      }

      await axios.post(
        `${import.meta.env.VITE_API_URL}/review`,
        {
          reviewId: 0,
          freelancerId: selectedContract.freelancerId,
          contractId: selectedContract.id,
          review,
          rating
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json"
          }
        }
      );

      handleModalActions.close();
      fetchContracts();
    } catch (e) {
      console.error("Review error:", e);
      updateState({ error: "Failed to submit review. Please try again." });
    }
  };

  if (state.loading) return <div className="flex justify-center p-8"><Loader /></div>;
  if (state.error) return <div className="p-8"><Text color="red">{state.error}</Text></div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Contracts</h1>
      {state.contracts.length === 0 && <Text>No contracts found.</Text>}

      <div className="space-y-4">
        {state.contracts.map((contract) => {
          const showClientButton = state.role === "CLIENT" && contract.status === "ACTIVE";
          const showFreelancerButton = state.role === "FREELANCER" && contract.status === "CLOSED" && !contract.hasFreelancerReview;

          return (
            <Paper key={contract.id} className="p-4 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex justify-between">
                <div className="space-y-2">
                  <Text size="lg" fw={600}>{contract.jobsTitle}</Text>
                  <Text c="dimmed" size="sm">{contract.jobsDescription}</Text>
                  <Badge color={contract.status === "ACTIVE" ? "green" : "gray"}>
                    {contract.status}
                  </Badge>
                </div>
                <div className="text-right space-y-2">
                  <Text className="flex items-center justify-end">
                    <DollarSign size={16} className="mr-1" />{contract.amount}
                  </Text>
                  {(showClientButton || showFreelancerButton) && (
                    <button
                      onClick={() => handleModalActions.open(contract)}
                      className={`px-3 py-1 rounded text-white ${showClientButton ? "bg-red-500 hover:bg-red-600" : "bg-green-600 hover:bg-green-700"}`}
                    >
                      {showClientButton ? "Close & Review" : "Submit Review"}
                    </button>
                  )}
                </div>
              </div>
            </Paper>
          );
        })}
      </div>

      <Modal opened={state.modalOpen} onClose={handleModalActions.close} title="Submit Review">
        <div className="space-y-4">
          <div>
            <Text fw={500}>Your Rating</Text>
            <Rating
              value={state.rating}
              onChange={(value) => updateState({ rating: value })}
            />
          </div>
          <div>
            <Text fw={500}>Your Review</Text>
            <Textarea
              value={state.review}
              onChange={(e) => updateState({ review: e.target.value })}
              placeholder="Write your review here..."
              minRows={4}
              required
            />
          </div>
          <div className="text-right">
            <button
              onClick={handleSubmit}
              disabled={!state.rating || !state.review.trim()}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Contracts;
